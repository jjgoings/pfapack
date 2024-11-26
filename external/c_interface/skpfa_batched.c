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
    double *A_batch_real_imag,         // Shape: (S, G, 2, N, N)
    double *PFAFF_batch_real_imag,     // Shape: (S, G, 2)
    double *INV_batch_real_imag,       // Shape: (S, G, 2, N, N)
    const char *UPLO, const char *MTHD)
{
    // Convert UPLO and MTHD to uppercase
    char uplo = toupper((unsigned char)UPLO[0]);
    char mthd = toupper((unsigned char)MTHD[0]);

    // Input validation
    if (N < 0) return -1;
    if (!A_batch_real_imag || !PFAFF_batch_real_imag || !INV_batch_real_imag) return -2;
    if (uplo != 'U' && uplo != 'L') return -3;
    if (mthd != 'P' && mthd != 'H') return -4;

    // Handle N == 0 case
    if (N == 0) {
        const size_t batch_size = (size_t)outer_batch_size * inner_batch_size;
        for (size_t idx = 0; idx < batch_size; idx++) {
            PFAFF_batch_real_imag[2 * idx] = 1.0;    // Real part
            PFAFF_batch_real_imag[2 * idx + 1] = 0.0; // Imaginary part
        }
        return 0;
    }

    int info = 0;
    int ldim = N;
    size_t matrix_size = (size_t)N * N;

    // Workspace query for PFAPACK_zskpfa
    int lwork_pf = -1;
    double complex qwork_pf = 0.0 + 0.0*I;
    double complex dummy_matrix_pf[1] = {0.0 + 0.0*I};
    double complex dummy_pfaffian = 0.0 + 0.0*I;

    // Allocate iwork and rwork for PFAPACK
    int *iwork = (int *)malloc(sizeof(int) * N);
    double *rwork = (double *)malloc(sizeof(double) * (N - 1));
    if (!iwork || !rwork) {
        free(iwork);
        free(rwork);
        return -100;
    }

    // Perform workspace query for PFAPACK_zskpfa
    PFAPACK_zskpfa(&uplo, &mthd, &N, dummy_matrix_pf, &ldim, &dummy_pfaffian,
                  iwork, &qwork_pf, &lwork_pf, rwork, &info);
    if (info != 0) {
        free(iwork);
        free(rwork);
        return -100 - info;
    }
    lwork_pf = (int)creal(qwork_pf);
    if (lwork_pf < 1) lwork_pf = 1;

    // Workspace query for zgetri_
    int lwork_inv = -1;
    double complex qwork_inv = 0.0 + 0.0*I;
    double complex dummy_matrix_inv[1] = {0.0 + 0.0*I};
    int *ipiv = (int *)malloc(sizeof(int) * N);
    if (!ipiv) {
        free(iwork);
        free(rwork);
        return -101;
    }

    zgetri_(&N, dummy_matrix_inv, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) {
        free(ipiv);
        free(iwork);
        free(rwork);
        return -200 - info;
    }
    lwork_inv = (int)creal(qwork_inv);
    if (lwork_inv < 1) lwork_inv = 1;

    // Determine maximum lwork needed
    int lwork_total = (lwork_pf > lwork_inv) ? lwork_pf : lwork_inv;

    // Allocate work array with 64-byte alignment
    double complex *work = NULL;
    if (posix_memalign((void **)&work, 64, sizeof(double complex) * lwork_total) != 0) {
        free(ipiv);
        free(iwork);
        free(rwork);
        return -300;
    }

    // Allocate buffers for Pfaffian and inverse computations
    double complex *pfaff_buffer = NULL;
    double complex *inv_buffer = NULL;
    if (posix_memalign((void **)&pfaff_buffer, 64, sizeof(double complex) * matrix_size) != 0 ||
        posix_memalign((void **)&inv_buffer, 64, sizeof(double complex) * matrix_size) != 0) {
        free(work);
        free(ipiv);
        free(iwork);
        free(rwork);
        if (pfaff_buffer) free(pfaff_buffer);
        if (inv_buffer) free(inv_buffer);
        return -301;
    }

    // Iterate over each matrix in the batch
    for (int s = 0; s < outer_batch_size; s++) {
        for (int g = 0; g < inner_batch_size; g++) {
            size_t batch_idx = (size_t)s * inner_batch_size + (size_t)g;
            size_t matrix_offset = batch_idx * 2 * matrix_size; // 2 for real and imag
            size_t pfaff_offset = batch_idx * 2; // 2 for real and imag Pfaffian

            double *current_matrix_real = A_batch_real_imag + matrix_offset;
            double *current_matrix_imag = current_matrix_real + matrix_size;
            double *current_pfaffian_real = PFAFF_batch_real_imag + pfaff_offset;
            double *current_pfaffian_imag = current_pfaffian_real + 1;
            double *current_inverse_real = INV_batch_real_imag + matrix_offset;
            double *current_inverse_imag = current_inverse_real + matrix_size;

            // Construct the skew-symmetric matrix for Pfaffian computation
            // pfaff_buffer = -A_real + i*(-A_imag) for upper triangle and A_real + i*A_imag for lower
            // Diagonal elements are zero
            for (int row = 0; row < N; row++) {
                pfaff_buffer[row * N + row] = 0.0 + 0.0*I; // Diagonal elements
                for (int col = row + 1; col < N; col++) {
                    size_t idx = row * N + col;
                    double a_real = current_matrix_real[row * N + col];
                    double a_imag = current_matrix_imag[row * N + col];
                    double complex value = a_real + I * a_imag;

                    pfaff_buffer[idx] = -value;
                    pfaff_buffer[col * N + row] = value;
                }
            }

            // Compute Pfaffian
            double complex current_pfaffian = 0.0 + 0.0*I;
            PFAPACK_zskpfa(&uplo, &mthd, &N, pfaff_buffer, &ldim, &current_pfaffian,
                          iwork, work, &lwork_total, rwork, &info);
            if (info != 0) {
                // Cleanup before returning
                free(inv_buffer);
                free(pfaff_buffer);
                free(work);
                free(ipiv);
                free(iwork);
                free(rwork);
                return -400 - info;
            }

            // Store Pfaffian results
            current_pfaffian_real[0] = creal(current_pfaffian);
            current_pfaffian_imag[0] = cimag(current_pfaffian);

            // Construct the complex matrix for inversion
            // inv_buffer = A_real + i*A_imag
            for (size_t idx = 0; idx < matrix_size; idx++) {
                inv_buffer[idx] = current_matrix_real[idx] + I * current_matrix_imag[idx];
            }

            // Compute LU decomposition
            zgetrf_(&N, &N, inv_buffer, &ldim, ipiv, &info);
            if (info != 0) {
                // Cleanup before returning
                free(inv_buffer);
                free(pfaff_buffer);
                free(work);
                free(ipiv);
                free(iwork);
                free(rwork);
                return -500 - info;
            }

            // Compute inverse
            zgetri_(&N, inv_buffer, &ldim, ipiv, work, &lwork_total, &info);
            if (info != 0) {
                // Cleanup before returning
                free(inv_buffer);
                free(pfaff_buffer);
                free(work);
                free(ipiv);
                free(iwork);
                free(rwork);
                return -600 - info;
            }

            // Store inverse results
            for (size_t idx = 0; idx < matrix_size; idx++) {
                double complex val = inv_buffer[idx];
                current_inverse_real[idx] = creal(val);
                current_inverse_imag[idx] = cimag(val);
            }
        }
    }

    // Free allocated memory
    free(inv_buffer);
    free(pfaff_buffer);
    free(work);
    free(ipiv);
    free(iwork);
    free(rwork);

    return 0;
}


#ifdef __cplusplus
}
#endif
