#include "commondefs.h"
#include "fortran.h"
#include "fortran_pfapack.h"
#include "pfapack.h"
#include <string.h>  // Required for memcpy
#include <stdio.h>
#include <complex.h>
#include <ctype.h>  // Include ctype.h for toupper

#ifdef __cplusplus
extern "C" {
#endif

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
        int ldim = N;
        int info = 0;
        int lwork = -1;
        double qwork;

        // Allocate memory for the entire batch
        int *iwork = (int *)malloc(sizeof(int) * N);
        if (!iwork) return -100;

        // Workspace query
        PFAPACK_dskpfa(&uplo, &mthd, &N, A_batch, &ldim, &qwork,
                       iwork, &qwork, &lwork, &info);

        if (info) {
            free(iwork);
            return -101;
        }

        lwork = (int)qwork;
        double *work = (double *)malloc(sizeof(double) * lwork);
        if (!work) {
            free(iwork);
            return -102;
        }

        // Allocate memory for the matrix copy once
        double *matrix_copy = (double *)malloc(sizeof(double) * N * N);
        if (!matrix_copy) {
            free(work);
            free(iwork);
            return -103;
        }

        // Process each matrix in the batch
        for (int i = 0; i < batch_size; i++) {
            double *current_matrix = A_batch + i * N * N;
            double *current_pfaffian = PFAFF_batch + i;

            // Copy the upper triangular part and negate it
            for (int row = 0; row < N; row++) {
                for (int col = row + 1; col < N; col++) {
                    matrix_copy[row * N + col] = -current_matrix[row * N + col];
                    matrix_copy[col * N + row] = current_matrix[row * N + col];
                }
                matrix_copy[row * N + row] = 0.0;  // Diagonal elements should be zero
            }

            PFAPACK_dskpfa(&uplo, &mthd, &N, matrix_copy, &ldim, current_pfaffian,
                           iwork, work, &lwork, &info);

            if (info) {
                free(matrix_copy);
                free(work);
                free(iwork);
                return -104 - i;
            }
        }

        // Free allocated memory
        free(matrix_copy);
        free(work);
        free(iwork);
    }
    else {
        for (int i = 0; i < batch_size; i++) {
            PFAFF_batch[i] = 1.0;
        }
    }

    return 0;
}

int skpfa_batched_z(int batch_size, int N, double *A_batch_real_imag, double *PFAFF_batch_real_imag,
                    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (A_batch_real_imag == NULL) return -2;
    if (PFAFF_batch_real_imag == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        int ldim = N;
        int info = 0;
        int lwork = -1;
        double *rwork = NULL;
        int *iwork = NULL;
        double complex qwork;
        double complex *work = NULL;
        double complex *matrix_copy = NULL;

        // Allocate memory
        iwork = (int *)malloc(sizeof(int) * N);
        if (!iwork) return -100;

        rwork = (double *)malloc(sizeof(double) * (N - 1));
        if (!rwork) {
            free(iwork);
            return -100;
        }

        // Workspace query
        double complex dummy_matrix[1];
        double complex dummy_pfaffian;
        PFAPACK_zskpfa(&uplo, &mthd, &N, dummy_matrix, &ldim, &dummy_pfaffian,
                       iwork, &qwork, &lwork, rwork, &info);

        if (info) {
            free(rwork);
            free(iwork);
            return -101;
        }

        lwork = (int)creal(qwork);
        work = (double complex *)malloc(sizeof(double complex) * lwork);
        if (!work) {
            // Try minimal workspace
            if (mthd == 'P') lwork = 1;
            else lwork = 2 * N - 1;

            work = (double complex *)malloc(sizeof(double complex) * lwork);
            if (!work) {
                free(rwork);
                free(iwork);
                return -100;
            }
        }

        // Allocate matrix_copy once
        matrix_copy = (double complex *)malloc(sizeof(double complex) * N * N);
        if (!matrix_copy) {
            free(work);
            free(rwork);
            free(iwork);
            return -103;
        }

        // Process each matrix in the batch
        for (int i = 0; i < batch_size; i++) {
            double *current_matrix_real = A_batch_real_imag + i * 2 * N * N;
            double *current_matrix_imag = current_matrix_real + N * N;
            double *current_pfaffian_real = PFAFF_batch_real_imag + i * 2;
            double *current_pfaffian_imag = current_pfaffian_real + 1;

            // Copy the upper triangular part and negate it
            for (int row = 0; row < N; row++) {
                for (int col = row + 1; col < N; col++) {
                    double complex value = current_matrix_real[row * N + col] + I * current_matrix_imag[row * N + col];
                    matrix_copy[row * N + col] = -value;
                    matrix_copy[col * N + row] = value;
                }
                matrix_copy[row * N + row] = 0.0;  // Diagonal elements should be zero
            }

            double complex current_pfaffian;
            PFAPACK_zskpfa(&uplo, &mthd, &N, matrix_copy, &ldim, &current_pfaffian,
                           iwork, work, &lwork, rwork, &info);

            *current_pfaffian_real = creal(current_pfaffian);
            *current_pfaffian_imag = cimag(current_pfaffian);

            if (info) {
                free(matrix_copy);
                free(work);
                free(rwork);
                free(iwork);
                return -104 - i;
            }
        }

        // Free allocated memory
        free(matrix_copy);
        free(work);
        free(rwork);
        free(iwork);
    }
    else {
        for (int i = 0; i < batch_size; i++) {
            PFAFF_batch_real_imag[2 * i] = 1.0;
            PFAFF_batch_real_imag[2 * i + 1] = 0.0;
        }
    }

    return 0;
}

int skpfa_batched_4d_d(int outer_batch_size, int inner_batch_size, int N, double *A_batch, double *PFAFF_batch,
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
        int ldim = N;
        int info = 0;
        int lwork = -1;
        double qwork;

        // Allocate memory for the entire batch
        int *iwork = (int *)malloc(sizeof(int) * N);
        if (!iwork) return -100;

        // Workspace query
        PFAPACK_dskpfa(&uplo, &mthd, &N, A_batch, &ldim, &qwork,
                       iwork, &qwork, &lwork, &info);

        if (info) {
            free(iwork);
            return -101;
        }

        lwork = (int)qwork;
        double *work = (double *)malloc(sizeof(double) * lwork);
        if (!work) {
            free(iwork);
            return -102;
        }

        // Allocate memory for the matrix copy once
        double *matrix_copy = (double *)malloc(sizeof(double) * N * N);
        if (!matrix_copy) {
            free(work);
            free(iwork);
            return -103;
        }

        // Process each matrix in the 4D batch
        for (int i = 0; i < outer_batch_size; i++) {
            for (int j = 0; j < inner_batch_size; j++) {
                double *current_matrix = A_batch + (i * inner_batch_size + j) * N * N;
                double *current_pfaffian = PFAFF_batch + (i * inner_batch_size + j);

                // Copy the upper triangular part and negate it
                for (int row = 0; row < N; row++) {
                    for (int col = row + 1; col < N; col++) {
                        matrix_copy[row * N + col] = -current_matrix[row * N + col];
                        matrix_copy[col * N + row] = current_matrix[row * N + col];
                    }
                    matrix_copy[row * N + row] = 0.0;  // Diagonal elements should be zero
                }

                PFAPACK_dskpfa(&uplo, &mthd, &N, matrix_copy, &ldim, current_pfaffian,
                               iwork, work, &lwork, &info);

                if (info) {
                    free(matrix_copy);
                    free(work);
                    free(iwork);
                    return -104 - i * inner_batch_size - j;
                }
            }
        }

        // Free allocated memory
        free(matrix_copy);
        free(work);
        free(iwork);
    }
    else {
        for (int i = 0; i < outer_batch_size * inner_batch_size; i++) {
            PFAFF_batch[i] = 1.0;
        }
    }

    return 0;
}

int skpfa_batched_4d_z(int outer_batch_size, int inner_batch_size, int N, double *A_batch_real_imag, double *PFAFF_batch_real_imag,
                       const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (A_batch_real_imag == NULL) return -2;
    if (PFAFF_batch_real_imag == NULL) return -3;
    if (uplo != 'U' && uplo != 'L') return -4;
    if (mthd != 'P' && mthd != 'H') return -5;

    if (N > 0) {
        int ldim = N;
        int info = 0;
        int lwork = -1;
        double *rwork = NULL;
        int *iwork = NULL;
        double complex qwork;
        double complex *work = NULL;
        double complex *matrix_copy = NULL;

        // Allocate memory
        iwork = (int *)malloc(sizeof(int) * N);
        if (!iwork) return -100;

        rwork = (double *)malloc(sizeof(double) * (N - 1));
        if (!rwork) {
            free(iwork);
            return -100;
        }

        // Workspace query
        double complex dummy_matrix[1];
        double complex dummy_pfaffian;
        PFAPACK_zskpfa(&uplo, &mthd, &N, dummy_matrix, &ldim, &dummy_pfaffian,
                       iwork, &qwork, &lwork, rwork, &info);

        if (info) {
            free(rwork);
            free(iwork);
            return -101;
        }

        lwork = (int)creal(qwork);
        work = (double complex *)malloc(sizeof(double complex) * lwork);
        if (!work) {
            // Try minimal workspace
            if (mthd == 'P') lwork = 1;
            else lwork = 2 * N - 1;

            work = (double complex *)malloc(sizeof(double complex) * lwork);
            if (!work) {
                free(rwork);
                free(iwork);
                return -100;
            }
        }

        // Allocate matrix_copy once
        matrix_copy = (double complex *)malloc(sizeof(double complex) * N * N);
        if (!matrix_copy) {
            free(work);
            free(rwork);
            free(iwork);
            return -103;
        }

        // Process each matrix in the 4D batch
        for (int i = 0; i < outer_batch_size; i++) {
            for (int j = 0; j < inner_batch_size; j++) {
                double *current_matrix_real = A_batch_real_imag + (i * inner_batch_size + j) * 2 * N * N;
                double *current_matrix_imag = current_matrix_real + N * N;
                double *current_pfaffian_real = PFAFF_batch_real_imag + (i * inner_batch_size + j) * 2;
                double *current_pfaffian_imag = current_pfaffian_real + 1;

                // Copy the upper triangular part and negate it
                for (int row = 0; row < N; row++) {
                    for (int col = row + 1; col < N; col++) {
                        double complex value = current_matrix_real[row * N + col] + I * current_matrix_imag[row * N + col];
                        matrix_copy[row * N + col] = -value;
                        matrix_copy[col * N + row] = value;
                    }
                    matrix_copy[row * N + row] = 0.0;  // Diagonal elements should be zero
                }

                double complex current_pfaffian;
                PFAPACK_zskpfa(&uplo, &mthd, &N, matrix_copy, &ldim, &current_pfaffian,
                               iwork, work, &lwork, rwork, &info);

                *current_pfaffian_real = creal(current_pfaffian);
                *current_pfaffian_imag = cimag(current_pfaffian);

                if (info) {
                    free(matrix_copy);
                    free(work);
                    free(rwork);
                    free(iwork);
                    return -104 - i * inner_batch_size - j;
                }
            }
        }

        // Free allocated memory
        free(matrix_copy);
        free(work);
        free(rwork);
        free(iwork);
    }
    else {
        for (int i = 0; i < outer_batch_size * inner_batch_size; i++) {
            PFAFF_batch_real_imag[2 * i] = 1.0;
            PFAFF_batch_real_imag[2 * i + 1] = 0.0;
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
