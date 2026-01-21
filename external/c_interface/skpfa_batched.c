#include "commondefs.h"
#include "fortran.h"
#include "fortran_pfapack.h"
#include "pfapack.h"
#include <string.h>
#include <stdio.h>
#include <complex.h>
#include <ctype.h>
#include <stdlib.h>
#include <math.h>

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

typedef struct {
    int n;
    int ldim;
    int lwork;
    int *iwork;
    double *work;
} pfapack_workspace_d;

static void pfapack_workspace_d_free(pfapack_workspace_d *ws) {
    if (!ws) {
        return;
    }
    free(ws->work);
    free(ws->iwork);
    ws->work = NULL;
    ws->iwork = NULL;
    ws->lwork = 0;
    ws->n = 0;
    ws->ldim = 0;
}

static int pfapack_workspace_d_init(
    pfapack_workspace_d *ws,
    int n,
    char uplo,
    char mthd,
    double *a_scratch
) {
    if (!ws || !a_scratch) {
        return -2;
    }

    ws->n = n;
    ws->ldim = n;
    ws->lwork = 0;
    ws->iwork = NULL;
    ws->work = NULL;

    ws->iwork = (int *)malloc(sizeof(int) * (size_t)n);
    if (!ws->iwork) {
        return -100;
    }

    int info = 0;
    int lwork_query = -1;
    double qwork = 0.0;
    double pfaff_dummy = 0.0;
    PFAPACK_dskpfa(&uplo, &mthd, &n, a_scratch, &ws->ldim,
                  &pfaff_dummy, ws->iwork, &qwork, &lwork_query, &info);
    if (info) {
        pfapack_workspace_d_free(ws);
        return info;
    }

    ws->lwork = (int)qwork;
    if (ws->lwork < 1) {
        ws->lwork = 1;
    }

    ws->work = (double *)malloc(sizeof(double) * (size_t)ws->lwork);
    if (!ws->work) {
        ws->lwork = (mthd == 'P') ? 1 : (2 * n - 1);
        ws->work = (double *)malloc(sizeof(double) * (size_t)ws->lwork);
        if (!ws->work) {
            pfapack_workspace_d_free(ws);
            return -100;
        }
    }

    return 0;
}

typedef struct {
    int n;
    int ldim;
    int lwork;
    int *iwork;
    double *rwork;
    doublecmplx *work;
} pfapack_workspace_z;

static void pfapack_workspace_z_free(pfapack_workspace_z *ws) {
    if (!ws) {
        return;
    }
    free(ws->work);
    free(ws->rwork);
    free(ws->iwork);
    ws->work = NULL;
    ws->rwork = NULL;
    ws->iwork = NULL;
    ws->lwork = 0;
    ws->n = 0;
    ws->ldim = 0;
}

static int pfapack_workspace_z_init(
    pfapack_workspace_z *ws,
    int n,
    char uplo,
    char mthd,
    doublecmplx *a_scratch
) {
    if (!ws || !a_scratch) {
        return -2;
    }

    ws->n = n;
    ws->ldim = n;
    ws->lwork = 0;
    ws->iwork = NULL;
    ws->rwork = NULL;
    ws->work = NULL;

    ws->iwork = (int *)malloc(sizeof(int) * (size_t)n);
    if (!ws->iwork) {
        return -100;
    }
    ws->rwork = (double *)malloc(sizeof(double) * (size_t)(n - 1));
    if (!ws->rwork) {
        pfapack_workspace_z_free(ws);
        return -100;
    }

    int info = 0;
    int lwork_query = -1;
    doublecmplx qwork = 0.0;
    doublecmplx pfaff_dummy = 0.0;
    PFAPACK_zskpfa(&uplo, &mthd, &n, a_scratch, &ws->ldim,
                   &pfaff_dummy, ws->iwork, &qwork, &lwork_query, ws->rwork, &info);
    if (info) {
        pfapack_workspace_z_free(ws);
        return info;
    }

    ws->lwork = (int)real(qwork);
    if (ws->lwork < 1) {
        ws->lwork = 1;
    }

    ws->work = (doublecmplx *)malloc(sizeof(doublecmplx) * (size_t)ws->lwork);
    if (!ws->work) {
        ws->lwork = (mthd == 'P') ? 1 : (2 * n - 1);
        ws->work = (doublecmplx *)malloc(sizeof(doublecmplx) * (size_t)ws->lwork);
        if (!ws->work) {
            pfapack_workspace_z_free(ws);
            return -100;
        }
    }

    return 0;
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
        const size_t matrix_elems = (size_t)N * (size_t)N;
        double *A_work = (double *)malloc(matrix_elems * sizeof(double));
        if (!A_work) return -100;

        pfapack_workspace_d ws;
        int ws_ret = pfapack_workspace_d_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        for (int i = 0; i < batch_size; i++) {
            // Get pointer to current matrix in batch
            double *A = A_batch + (size_t)i * matrix_elems;
            
            // Convert from C to Fortran order using block transposition
            transpose_matrix(A, A_work, N);
            
            // Compute Pfaffian
            int info = 0;
            PFAPACK_dskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[i],
                           ws.iwork, ws.work, &ws.lwork, &info);
            if (info) {
                pfapack_workspace_d_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_d_free(&ws);
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
        const size_t matrix_elems = (size_t)N * (size_t)N;
        doublecmplx *A_work = (doublecmplx *)malloc(matrix_elems * sizeof(doublecmplx));
        if (!A_work) return -100;

        pfapack_workspace_z ws;
        int ws_ret = pfapack_workspace_z_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        for (int i = 0; i < batch_size; i++) {
            // Get pointer to current matrix in batch
            doublecmplx *A = A_batch + (size_t)i * matrix_elems;
            
            // Convert from C to Fortran order using block transposition
            transpose_matrix_complex(A, A_work, N);
            
            // Compute Pfaffian
            int info = 0;
            PFAPACK_zskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[i],
                           ws.iwork, ws.work, &ws.lwork, ws.rwork, &info);
            if (info) {
                pfapack_workspace_z_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_z_free(&ws);
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
        const size_t matrix_elems = (size_t)N * (size_t)N;
        double *A_work = (double *)malloc(matrix_elems * sizeof(double));
        if (!A_work) return -100;

        pfapack_workspace_d ws;
        int ws_ret = pfapack_workspace_d_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        // Process each matrix in the batch
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int idx = 0; idx < total_matrices; idx++) {
            // Get pointers to current matrix and output
            double *A = A_batch + (size_t)idx * matrix_elems;

            // Convert from C to Fortran order using block transposition
            transpose_matrix(A, A_work, N);

            // Compute Pfaffian
            int info = 0;
            PFAPACK_dskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[idx],
                           ws.iwork, ws.work, &ws.lwork, &info);
            if (info) {
                pfapack_workspace_d_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_d_free(&ws);
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
        const size_t matrix_elems = (size_t)N * (size_t)N;
        doublecmplx *A_work = (doublecmplx *)malloc(matrix_elems * sizeof(doublecmplx));
        if (!A_work) return -100;

        pfapack_workspace_z ws;
        int ws_ret = pfapack_workspace_z_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        // Process each matrix in the batch
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int idx = 0; idx < total_matrices; idx++) {
            // Get pointers to current matrix and output
            doublecmplx *A = A_batch + (size_t)idx * matrix_elems;

            // Convert from C to Fortran order using block transposition
            transpose_matrix_complex(A, A_work, N);

            // Compute Pfaffian
            int info = 0;
            PFAPACK_zskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[idx],
                           ws.iwork, ws.work, &ws.lwork, ws.rwork, &info);
            if (info) {
                pfapack_workspace_z_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_z_free(&ws);
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

int skpfa_batched_4d_d_f(int outer_batch_size, int inner_batch_size, int N,
                         double *A_batch, double *PFAFF_batch,
                         const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        const size_t matrix_elems = (size_t)N * (size_t)N;
        double *A_work = (double *)malloc(matrix_elems * sizeof(double));
        if (!A_work) return -100;

        pfapack_workspace_d ws;
        int ws_ret = pfapack_workspace_d_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        const int total_matrices = outer_batch_size * inner_batch_size;
        const size_t matrix_bytes = matrix_elems * sizeof(double);

        for (int idx = 0; idx < total_matrices; idx++) {
            double *A = A_batch + (size_t)idx * matrix_elems;
            memcpy(A_work, A, matrix_bytes);

            int info = 0;
            PFAPACK_dskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[idx],
                           ws.iwork, ws.work, &ws.lwork, &info);
            if (info) {
                pfapack_workspace_d_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_d_free(&ws);
        free(A_work);
    }
    else {
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int i = 0; i < total_matrices; i++) {
            PFAFF_batch[i] = 1.0;
        }
    }

    return 0;
}

int skpfa_batched_4d_z_f(int outer_batch_size, int inner_batch_size, int N,
                         doublecmplx *A_batch, doublecmplx *PFAFF_batch,
                         const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (A_batch == NULL) return -2;
    if (PFAFF_batch == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        const size_t matrix_elems = (size_t)N * (size_t)N;
        doublecmplx *A_work = (doublecmplx *)malloc(matrix_elems * sizeof(doublecmplx));
        if (!A_work) return -100;

        pfapack_workspace_z ws;
        int ws_ret = pfapack_workspace_z_init(&ws, N, uplo, mthd, A_work);
        if (ws_ret != 0) {
            free(A_work);
            return ws_ret;
        }

        const int total_matrices = outer_batch_size * inner_batch_size;
        const size_t matrix_bytes = matrix_elems * sizeof(doublecmplx);

        for (int idx = 0; idx < total_matrices; idx++) {
            doublecmplx *A = A_batch + (size_t)idx * matrix_elems;
            memcpy(A_work, A, matrix_bytes);

            int info = 0;
            PFAPACK_zskpfa(&uplo, &mthd, &N, A_work, &ws.ldim, &PFAFF_batch[idx],
                           ws.iwork, ws.work, &ws.lwork, ws.rwork, &info);
            if (info) {
                pfapack_workspace_z_free(&ws);
                free(A_work);
                return info;
            }
        }

        pfapack_workspace_z_free(&ws);
        free(A_work);
    }
    else {
        const int total_matrices = outer_batch_size * inner_batch_size;
        for (int i = 0; i < total_matrices; i++) {
            PFAFF_batch[i] = doublecmplx_one;
        }
    }

    return 0;
}

int skpfa_batched_4d_z_with_inverse(
    int outer_batch_size, int inner_batch_size, int N,
    doublecmplx *A_batch, 
    doublecmplx *pfaffians,
    doublecmplx *inverses,
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);
    const char uplo_pfa = (uplo == 'U') ? 'L' : 'U';

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
            // Assuming the inverse of a 0x0 matrix is also a 0x0 matrix, which can be treated as an empty operation
        }
        return 0;
    }

    // Calculate total number of matrices
    const size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
    const size_t matrix_size = (size_t)N * N;

    // Allocate buffer for work_pfaffian, ipiv, iwork, rwork
    size_t initial_buffer_size =
        sizeof(doublecmplx) * matrix_size +   // work_pfaffian
        sizeof(int) * 2 * N +                 // ipiv and iwork
        sizeof(double) * (N - 1);             // rwork

    void *initial_buffer = NULL;
    if (posix_memalign(&initial_buffer, 64, initial_buffer_size) != 0)
        return -100;

    // Partition the buffer
    doublecmplx *work_pfaffian = (doublecmplx *)initial_buffer;
    int *ipiv = (int *)(work_pfaffian + matrix_size);
    int *iwork = ipiv + N;
    double *rwork = (double *)(iwork + N);

    // Step 2: Perform workspace queries to determine optimal lwork
    // Initialize variables for workspace queries
    int lwork_pf = -1;
    int lwork_inv = -1;
    doublecmplx qwork_pf = 0.0;
    doublecmplx qwork_inv = 0.0;
    int info = 0;
    int ldim = N;

    // Query optimal workspace for Pfaffian
    PFAPACK_zskpfa(&uplo_pfa, &mthd, &N, work_pfaffian, &ldim, &qwork_pf,
                  iwork, &qwork_pf, &lwork_pf, rwork, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    // Query optimal workspace for inverse
    zgetri_(&N, work_pfaffian, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    // Determine the maximum lwork needed
    int lwork = (int)(creal(qwork_pf) > creal(qwork_inv) ? creal(qwork_pf) : creal(qwork_inv));

    // Step 3: Allocate 'work' buffer based on the maximum lwork
    doublecmplx *work = NULL;
    if (posix_memalign((void **)&work, 64, sizeof(doublecmplx) * lwork) != 0) {
        free(initial_buffer);
        return -105;
    }

    // Process each matrix in the batch
    for (size_t idx = 0; idx < total_matrices; idx++) {
        doublecmplx *current_matrix = A_batch + idx * matrix_size;
        doublecmplx *current_inverse = inverses + idx * matrix_size;

        // Fast path: avoid the explicit transpose by passing row-major data to
        // the column-major PFAPACK kernel. This makes PFAPACK interpret the
        // matrix as A^T = -A (skew-symmetric), so we swap UPLO and apply the
        // Pfaffian sign correction below.
        memcpy(work_pfaffian, current_matrix, matrix_size * sizeof(doublecmplx));

        // Compute Pfaffian
        PFAPACK_zskpfa(&uplo_pfa, &mthd, &N, work_pfaffian, &ldim, &pfaffians[idx],
                      iwork, work, &lwork, rwork, &info);
        if (info != 0) {
            free(work);
            free(initial_buffer);
            return info;
        }

        // Sign correction: pf(-A) = (-1)^(N/2) * pf(A), needed because we pass
        // row-major data to column-major PFAPACK which interprets A as A^T = -A.
        if (((N / 2) & 1) != 0) {
            pfaffians[idx] = -pfaffians[idx];
        }

        if (cabs(pfaffians[idx]) > 1e-12) {
            // Build the inversion input in-place in the output buffer (or in-place on A_batch
            // when called with inplace=True in Python).
            if (current_inverse != current_matrix) {
                memcpy(current_inverse, current_matrix, matrix_size * sizeof(doublecmplx));
            }

            // Ensure the full matrix is filled (assuming skew-symmetric property).
            for (int i = 0; i < N; i++) {
                for (int j = i + 1; j < N; j++) {
                    current_inverse[(size_t)j * (size_t)N + (size_t)i] =
                        -current_inverse[(size_t)i * (size_t)N + (size_t)j];
                }
            }

            // Compute LU decomposition and inverse in-place.
            zgetrf_(&N, &N, current_inverse, &ldim, ipiv, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }

            // Compute inverse
            zgetri_(&N, current_inverse, &ldim, ipiv, work, &lwork, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }
        } else {
            memset(current_inverse, 0, matrix_size * sizeof(doublecmplx));
        }
    }

    // Cleanup
    free(work);
    free(initial_buffer);

    return 0;
}

int skpfa_batched_4d_d_with_inverse(
    int outer_batch_size, int inner_batch_size, int N,
    double *A_batch, 
    double *pfaffians,
    double *inverses,
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);
    const char uplo_pfa = (uplo == 'U') ? 'L' : 'U';

    // Input validation
    if (N < 0) return -1;
    if (!A_batch || !pfaffians || !inverses) return -2;
    if (uplo != 'U' && uplo != 'L') return -3;
    if (mthd != 'P' && mthd != 'H') return -4;

    // Handle N == 0 case
    if (N == 0) {
        size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
        for (size_t i = 0; i < total_matrices; i++) {
            pfaffians[i] = 1.0;
            // Assuming the inverse of a 0x0 matrix is also a 0x0 matrix, which can be treated as an empty operation
        }
        return 0;
    }

    // Calculate total number of matrices
    const size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
    const size_t matrix_size = (size_t)N * N;

    // Allocate buffer for work_pfaffian, ipiv, iwork
    size_t initial_buffer_size =
        sizeof(double) * matrix_size +    // work_pfaffian
        sizeof(int) * 2 * N;              // ipiv and iwork

    void *initial_buffer = NULL;
    if (posix_memalign(&initial_buffer, 64, initial_buffer_size) != 0)
        return -100;

    // Partition the buffer
    double *work_pfaffian = (double *)initial_buffer;
    int *ipiv = (int *)(work_pfaffian + matrix_size);
    int *iwork = ipiv + N;

    // Step 2: Perform workspace queries to determine optimal lwork
    // Initialize variables for workspace queries
    int lwork_pf = -1;
    int lwork_inv = -1;
    double qwork_pf = 0.0;
    double qwork_inv = 0.0;
    int info = 0;
    int ldim = N;

    // Query optimal workspace for Pfaffian
    PFAPACK_dskpfa(&uplo_pfa, &mthd, &N, work_pfaffian, &ldim, &qwork_pf,
                  iwork, &qwork_pf, &lwork_pf, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    // Query optimal workspace for inverse
    dgetri_(&N, work_pfaffian, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    // Determine the maximum lwork needed
    int lwork = (int)(qwork_pf > qwork_inv ? qwork_pf : qwork_inv);

    // Step 3: Allocate 'work' buffer based on the maximum lwork
    double *work = NULL;
    if (posix_memalign((void **)&work, 64, sizeof(double) * lwork) != 0) {
        free(initial_buffer);
        return -104;
    }

    // Process each matrix in the batch
    for (size_t idx = 0; idx < total_matrices; idx++) {
        double *current_matrix = A_batch + idx * matrix_size;
        double *current_inverse = inverses + idx * matrix_size;

        memcpy(work_pfaffian, current_matrix, matrix_size * sizeof(double));

        // Compute Pfaffian
        PFAPACK_dskpfa(&uplo_pfa, &mthd, &N, work_pfaffian, &ldim, &pfaffians[idx],
                      iwork, work, &lwork, &info);
        if (info != 0) {
            free(work);
            free(initial_buffer);
            return info;
        }

        // Sign correction: pf(-A) = (-1)^(N/2) * pf(A), needed because we pass
        // row-major data to column-major PFAPACK which interprets A as A^T = -A.
        if (((N / 2) & 1) != 0) {
            pfaffians[idx] = -pfaffians[idx];
        }

        if (fabs(pfaffians[idx]) > 1e-12) {
            if (current_inverse != current_matrix) {
                memcpy(current_inverse, current_matrix, matrix_size * sizeof(double));
            }

            // Ensure the full matrix is filled (assuming skew-symmetric property).
            for (int i = 0; i < N; i++) {
                for (int j = i + 1; j < N; j++) {
                    current_inverse[(size_t)j * (size_t)N + (size_t)i] =
                        -current_inverse[(size_t)i * (size_t)N + (size_t)j];
                }
            }

            // Compute LU decomposition and inverse in-place.
            dgetrf_(&N, &N, current_inverse, &ldim, ipiv, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }

            // Compute inverse
            dgetri_(&N, current_inverse, &ldim, ipiv, work, &lwork, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }
        } else {
            memset(current_inverse, 0, matrix_size * sizeof(double));
        }
    }

    // Cleanup
    free(work);
    free(initial_buffer);

    return 0;
}

int skpfa_batched_4d_z_with_inverse_f(
    int outer_batch_size, int inner_batch_size, int N,
    doublecmplx *A_batch,
    doublecmplx *pfaffians,
    doublecmplx *inverses,
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (!A_batch || !pfaffians || !inverses) return -2;
    if (uplo != 'U' && uplo != 'L') return -3;
    if (mthd != 'P' && mthd != 'H') return -4;

    if (N == 0) {
        size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
        for (size_t i = 0; i < total_matrices; i++) {
            pfaffians[i] = doublecmplx_one;
        }
        return 0;
    }

    const size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
    const size_t matrix_size = (size_t)N * N;

    size_t initial_buffer_size =
        sizeof(doublecmplx) * matrix_size +
        sizeof(int) * 2 * N +
        sizeof(double) * (N - 1);

    void *initial_buffer = NULL;
    if (posix_memalign(&initial_buffer, 64, initial_buffer_size) != 0)
        return -100;

    doublecmplx *work_pfaffian = (doublecmplx *)initial_buffer;
    int *ipiv = (int *)(work_pfaffian + matrix_size);
    int *iwork = ipiv + N;
    double *rwork = (double *)(iwork + N);

    int lwork_pf = -1;
    int lwork_inv = -1;
    doublecmplx qwork_pf = 0.0;
    doublecmplx qwork_inv = 0.0;
    int info = 0;
    int ldim = N;

    PFAPACK_zskpfa(&uplo, &mthd, &N, A_batch, &ldim, &qwork_pf,
                   iwork, &qwork_pf, &lwork_pf, rwork, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    zgetri_(&N, A_batch, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    int lwork = (int)(creal(qwork_pf) > creal(qwork_inv) ? creal(qwork_pf) : creal(qwork_inv));

    doublecmplx *work = NULL;
    if (posix_memalign((void **)&work, 64, sizeof(doublecmplx) * lwork) != 0) {
        free(initial_buffer);
        return -105;
    }

    for (size_t idx = 0; idx < total_matrices; idx++) {
        doublecmplx *current_matrix = A_batch + idx * matrix_size;
        doublecmplx *current_inverse = inverses + idx * matrix_size;

        memcpy(work_pfaffian, current_matrix, matrix_size * sizeof(doublecmplx));

        PFAPACK_zskpfa(&uplo, &mthd, &N, work_pfaffian, &ldim, &pfaffians[idx],
                        iwork, work, &lwork, rwork, &info);
        if (info != 0) {
            free(work);
            free(initial_buffer);
            return info;
        }

        if (cabs(pfaffians[idx]) > 1e-12) {
            memcpy(current_inverse, current_matrix, matrix_size * sizeof(doublecmplx));

            for (int i = 0; i < N; i++) {
                for (int j = i + 1; j < N; j++) {
                    current_inverse[j + i * N] = -current_inverse[i + j * N];
                }
            }

            zgetrf_(&N, &N, current_inverse, &ldim, ipiv, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }

            zgetri_(&N, current_inverse, &ldim, ipiv, work, &lwork, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }
        } else {
            memset(current_inverse, 0, matrix_size * sizeof(doublecmplx));
        }
    }

    free(work);
    free(initial_buffer);

    return 0;
}

int skpfa_batched_4d_d_with_inverse_f(
    int outer_batch_size, int inner_batch_size, int N,
    double *A_batch,
    double *pfaffians,
    double *inverses,
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (!A_batch || !pfaffians || !inverses) return -2;
    if (uplo != 'U' && uplo != 'L') return -3;
    if (mthd != 'P' && mthd != 'H') return -4;

    if (N == 0) {
        size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
        for (size_t i = 0; i < total_matrices; i++) {
            pfaffians[i] = 1.0;
        }
        return 0;
    }

    const size_t total_matrices = (size_t)outer_batch_size * inner_batch_size;
    const size_t matrix_size = (size_t)N * N;

    size_t initial_buffer_size =
        sizeof(double) * matrix_size +
        sizeof(int) * 2 * N;

    void *initial_buffer = NULL;
    if (posix_memalign(&initial_buffer, 64, initial_buffer_size) != 0)
        return -100;

    double *work_pfaffian = (double *)initial_buffer;
    int *ipiv = (int *)(work_pfaffian + matrix_size);
    int *iwork = ipiv + N;

    int lwork_pf = -1;
    int lwork_inv = -1;
    double qwork_pf = 0.0;
    double qwork_inv = 0.0;
    int info = 0;
    int ldim = N;

    PFAPACK_dskpfa(&uplo, &mthd, &N, A_batch, &ldim, &qwork_pf,
                   iwork, &qwork_pf, &lwork_pf, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    dgetri_(&N, A_batch, &ldim, ipiv, &qwork_inv, &lwork_inv, &info);
    if (info != 0) {
        free(initial_buffer);
        return info;
    }

    int lwork = (int)(qwork_pf > qwork_inv ? qwork_pf : qwork_inv);

    double *work = NULL;
    if (posix_memalign((void **)&work, 64, sizeof(double) * lwork) != 0) {
        free(initial_buffer);
        return -105;
    }

    for (size_t idx = 0; idx < total_matrices; idx++) {
        double *current_matrix = A_batch + idx * matrix_size;
        double *current_inverse = inverses + idx * matrix_size;

        memcpy(work_pfaffian, current_matrix, matrix_size * sizeof(double));

        PFAPACK_dskpfa(&uplo, &mthd, &N, work_pfaffian, &ldim, &pfaffians[idx],
                       iwork, work, &lwork, &info);
        if (info != 0) {
            free(work);
            free(initial_buffer);
            return info;
        }

        if (fabs(pfaffians[idx]) > 1e-12) {
            memcpy(current_inverse, current_matrix, matrix_size * sizeof(double));

            for (int i = 0; i < N; i++) {
                for (int j = i + 1; j < N; j++) {
                    current_inverse[j + i * N] = -current_inverse[i + j * N];
                }
            }

            dgetrf_(&N, &N, current_inverse, &ldim, ipiv, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }

            dgetri_(&N, current_inverse, &ldim, ipiv, work, &lwork, &info);
            if (info != 0) {
                free(work);
                free(initial_buffer);
                return info;
            }
        } else {
            memset(current_inverse, 0, matrix_size * sizeof(double));
        }
    }

    free(work);
    free(initial_buffer);

    return 0;
}


#ifdef __cplusplus
}
#endif
