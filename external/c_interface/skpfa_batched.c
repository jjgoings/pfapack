#include "commondefs.h"
#include "fortran.h"
#include "fortran_pfapack.h"
#include "pfapack.h"
#include <string.h>
#include <stdio.h>
#include <complex.h>
#include <ctype.h>

#ifdef __cplusplus
extern "C" {
#endif

#define MAX(a,b) ((a) > (b) ? (a) : (b))

// Helper function for block-wise matrix transposition
static inline void transpose_block(const double *src, double *dst, int N, 
                                 int row_start, int col_start, 
                                 int block_rows, int block_cols) {
    for (int i = 0; i < block_rows; i++) {
        for (int j = 0; j < block_cols; j++) {
            dst[(row_start + i) + (col_start + j) * N] = 
                src[(row_start + i) * N + (col_start + j)];
        }
    }
}

// Block-wise matrix transposition from C to Fortran order
static void transpose_matrix(const double *src, double *dst, int N) {
    const int BLOCK_SIZE = 32;  // Tune based on cache size
    
    for (int i = 0; i < N; i += BLOCK_SIZE) {
        for (int j = 0; j < N; j += BLOCK_SIZE) {
            const int block_rows = (i + BLOCK_SIZE > N) ? (N - i) : BLOCK_SIZE;
            const int block_cols = (j + BLOCK_SIZE > N) ? (N - j) : BLOCK_SIZE;
            transpose_block(src, dst, N, i, j, block_rows, block_cols);
        }
    }
}

// Complex version of block transposition
static inline void transpose_block_complex(const doublecmplx *src, doublecmplx *dst, int N,
                                         int row_start, int col_start,
                                         int block_rows, int block_cols) {
    for (int i = 0; i < block_rows; i++) {
        for (int j = 0; j < block_cols; j++) {
            dst[(row_start + i) + (col_start + j) * N] = 
                src[(row_start + i) * N + (col_start + j)];
        }
    }
}

// Block-wise complex matrix transposition
static void transpose_matrix_complex(const doublecmplx *src, doublecmplx *dst, int N) {
    const int BLOCK_SIZE = 16;  // Smaller for complex numbers due to size
    
    for (int i = 0; i < N; i += BLOCK_SIZE) {
        for (int j = 0; j < N; j += BLOCK_SIZE) {
            const int block_rows = (i + BLOCK_SIZE > N) ? (N - i) : BLOCK_SIZE;
            const int block_cols = (j + BLOCK_SIZE > N) ? (N - j) : BLOCK_SIZE;
            transpose_block_complex(src, dst, N, i, j, block_rows, block_cols);
        }
    }
}

int skpfa_batched_d(int batch_size, int N, double *A_batch, double *PFAFF_batch,
                    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        // Single workspace allocation for the entire batch
        double *A_work = (double *)malloc(N * N * sizeof(double));
        if (!A_work) return -100;
        
        for (int i = 0; i < batch_size; i++) {
            // Get pointer to current matrix in batch
            double *A = A_batch + i * N * N;
            
            // Convert from C to Fortran order using block transposition
            transpose_matrix(A, A_work, N);
            
            // Compute Pfaffian
            int ret = skpfa_d(N, A_work, &PFAFF_batch[i], UPLO, MTHD);
            
            if (ret != 0) {
                free(A_work);
                return ret;
            }
        }
        
        free(A_work);
    } else {
        // Handle empty matrix case
        for (int i = 0; i < batch_size; i++) {
            PFAFF_batch[i] = 1.0;
        }
    }

    return 0;
}

int skpfa_batched_z(int batch_size, int N, doublecmplx *A_batch, doublecmplx *PFAFF_batch,
                    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        // Single workspace allocation for the entire batch
        doublecmplx *A_work = (doublecmplx *)malloc(N * N * sizeof(doublecmplx));
        if (!A_work) return -100;
        
        for (int i = 0; i < batch_size; i++) {
            // Get pointer to current matrix in batch
            doublecmplx *A = A_batch + i * N * N;
            
            // Convert from C to Fortran order using block transposition
            transpose_matrix_complex(A, A_work, N);
            
            // Compute Pfaffian
            int ret = skpfa_z(N, A_work, &PFAFF_batch[i], UPLO, MTHD);
            
            if (ret != 0) {
                free(A_work);
                return ret;
            }
        }
        
        free(A_work);
    } else {
        // Handle empty matrix case
        for (int i = 0; i < batch_size; i++) {
            PFAFF_batch[i] = doublecmplx_one;
        }
    }

    return 0;
}

int skpfa_batched_4d_d(int outer_batch_size, int inner_batch_size, int N,
                       double *A_batch, double *PFAFF_batch,
                       const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        // Single workspace allocation for the entire batch
        double *A_work = (double *)malloc(N * N * sizeof(double));
        if (!A_work) return -100;

        // Process each matrix in the batch
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int idx = 0; idx < total_matrices; idx++) {
            // Get pointers to current matrix and output
            double *A = A_batch + idx * N * N;
            double *pfaff = PFAFF_batch + idx;
            
            // Convert from C to Fortran order
            transpose_matrix(A, A_work, N);
            
            // Compute Pfaffian
            int ret = skpfa_d(N, A_work, pfaff, UPLO, MTHD);
            if (ret != 0) {
                free(A_work);
                return ret;
            }
        }
        
        free(A_work);
    }
    else {
        // Handle empty matrix case
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int i = 0; i < total_matrices; i++) {
            PFAFF_batch[i] = 1.0;
        }
    }

    return 0;
}

// Complex double precision batched 4D implementation
int skpfa_batched_4d_z(int outer_batch_size, int inner_batch_size, int N,
                       doublecmplx *A_batch, doublecmplx *PFAFF_batch,
                       const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        // Single workspace allocation for the entire batch
        doublecmplx *A_work = (doublecmplx *)malloc(N * N * sizeof(doublecmplx));
        if (!A_work) return -100;

        // Process each matrix in the batch
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int idx = 0; idx < total_matrices; idx++) {
            // Get pointers to current matrix and output
            doublecmplx *A = A_batch + idx * N * N;
            doublecmplx *pfaff = PFAFF_batch + idx;
            
            // Copy and transpose the matrix
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) {
                    A_work[i + j * N] = A[i * N + j];
                }
            }
            
            // Compute Pfaffian
            int ret = skpfa_z(N, A_work, pfaff, UPLO, MTHD);
            if (ret != 0) {
                free(A_work);
                return ret;
            }
        }
        
        free(A_work);
    }
    else {
        // Handle empty matrix case
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int i = 0; i < total_matrices; i++) {
            PFAFF_batch[i] = doublecmplx_one;
        }
    }

    return 0;
}


int skpfa_batched_4d_z_with_inverse(
    int outer_batch_size, int inner_batch_size, int N,
    doublecmplx *A_batch,           // Shape: (outer_batch, inner_batch, N, N)
    doublecmplx *pfaffians,         // Shape: (outer_batch, inner_batch)
    doublecmplx *inverses,          // Shape: (outer_batch, inner_batch, N, N)
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (!A_batch || !pfaffians || !inverses) return -2;
    if (uplo != 'U' && uplo != 'L') return -3;
    if (mthd != 'P' && mthd != 'H') return -4;

    // Handle N == 0 case
    if (N == 0) {
        size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
        for (size_t i = 0; i < total_matrices; i++) {
            pfaffians[i] = doublecmplx_one;
        }
        return 0;
    }

    // Allocate workspace for single matrix processing
    size_t matrix_size = (size_t)N * N;
    doublecmplx *work_matrix = NULL;
    int *ipiv = NULL;
    int *iwork = NULL;
    double *rwork = NULL;
    doublecmplx *work = NULL;
    int info = 0;
    int ldim = N;

    // Allocate all required memory
    if (posix_memalign((void **)&work_matrix, 64, sizeof(doublecmplx) * matrix_size) != 0) 
        return -100;
    if (!(ipiv = (int *)malloc(sizeof(int) * N))) {
        free(work_matrix);
        return -101;
    }
    if (!(iwork = (int *)malloc(sizeof(int) * N))) {
        free(work_matrix);
        free(ipiv);
        return -102;
    }
    if (!(rwork = (double *)malloc(sizeof(double) * (N - 1)))) {
        free(work_matrix);
        free(ipiv);
        free(iwork);
        return -103;
    }

    // Workspace queries for both operations
    int lwork_pf = -1;
    int lwork_inv = -1;
    doublecmplx qwork_pf, qwork_inv;

    // Query optimal workspace for Pfaffian
    PFAPACK_zskpfa(&uplo, &mthd, &N, work_matrix, &ldim, &qwork_pf,
                   iwork, &qwork_pf, &lwork_pf, rwork, &info);
    if (info != 0) goto cleanup;

    // Query optimal workspace for inverse
    zgetri_(&N, work_matrix, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) goto cleanup;

    // Allocate workspace with maximum size needed - using MAX macro
    int lwork = MAX((int)creal(qwork_pf), (int)creal(qwork_inv));
    if (!(work = (doublecmplx *)malloc(sizeof(doublecmplx) * lwork))) {
        info = -104;
        goto cleanup;
    }

    // Process each matrix in the batch
    for (int s = 0; s < outer_batch_size; s++) {
        for (int g = 0; g < inner_batch_size; g++) {
            size_t idx = (size_t)s * inner_batch_size + g;
            doublecmplx *current_matrix = A_batch + idx * matrix_size;
            
            // Copy matrix for Pfaffian computation
            memcpy(work_matrix, current_matrix, matrix_size * sizeof(doublecmplx));
            
            // Compute Pfaffian
            PFAPACK_zskpfa(&uplo, &mthd, &N, work_matrix, &ldim, &pfaffians[idx],
                          iwork, work, &lwork, rwork, &info);
            if (info != 0) goto cleanup;

            // Copy matrix for inverse computation
            memcpy(work_matrix, current_matrix, matrix_size * sizeof(doublecmplx));
            
            // Compute LU decomposition
            zgetrf_(&N, &N, work_matrix, &ldim, ipiv, &info);
            if (info != 0) goto cleanup;

            // Compute inverse
            zgetri_(&N, work_matrix, &ldim, ipiv, work, &lwork, &info);
            if (info != 0) goto cleanup;

            // Copy result to output
            memcpy(inverses + idx * matrix_size, work_matrix, 
                   matrix_size * sizeof(doublecmplx));
        }
    }

cleanup:
    free(work_matrix);
    free(ipiv);
    free(iwork);
    free(rwork);
    free(work);
    
    return info;
}

#ifdef __cplusplus
}
#endif
