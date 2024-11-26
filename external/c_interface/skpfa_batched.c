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
    double *A_batch_real_imag,     // Shape: (outer_batch, inner_batch, 2, N, N)
    double *PFAFF_batch_real_imag, // Shape: (outer_batch, inner_batch, 2)
    double *INV_batch_real_imag,   // Shape: (outer_batch, inner_batch, 2, N, N)
    const char *UPLO, const char *MTHD)
{
    char uplo = toupper(UPLO[0]);
    char mthd = toupper(MTHD[0]);

    if (N < 0) return -1;
    if (A_batch_real_imag == NULL) return -2;
    if (PFAFF_batch_real_imag == NULL) return -3;
    if (INV_batch_real_imag == NULL) return -4;
    if (uplo != 'U' && uplo != 'L') return -5;
    if (mthd != 'P' && mthd != 'H') return -6;

    if (N > 0) {
        int ldim = N;
        int info = 0;
        int *iwork = NULL, *ipiv = NULL;
        double *rwork = NULL;
        double complex *work = NULL;
        double complex *matrix_copy = NULL;

        // Allocate memory
        iwork = (int *)malloc(sizeof(int) * N);
        ipiv = (int *)malloc(sizeof(int) * N);
        if (!iwork || !ipiv) return -100;

        rwork = (double *)malloc(sizeof(double) * (N - 1));
        if (!rwork) {
            free(ipiv);
            free(iwork);
            return -100;
        }

        // Query optimal workspace sizes
        int lwork = -1;
        double complex work_query;
        
        PFAPACK_zskpfa(&uplo, &mthd, &N, NULL, &ldim, &work_query,
                       iwork, &work_query, &lwork, rwork, &info);
        int lwork_pf = (int)creal(work_query);
        
        zgetri_(&N, NULL, &ldim, NULL, &work_query, &lwork, &info);
        int lwork_inv = (int)creal(work_query);
        
        lwork = (lwork_pf > lwork_inv) ? lwork_pf : lwork_inv;
        work = (double complex *)malloc(sizeof(double complex) * lwork);
        if (!work) {
            free(rwork);
            free(ipiv);
            free(iwork);
            return -100;
        }

        matrix_copy = (double complex *)malloc(sizeof(double complex) * N * N);
        if (!matrix_copy) {
            free(work);
            free(rwork);
            free(ipiv);
            free(iwork);
            return -103;
        }

        // Process each matrix in the batch
        for (int i = 0; i < outer_batch_size; i++) {
            for (int j = 0; j < inner_batch_size; j++) {
                double *current_matrix_real = A_batch_real_imag + (i * inner_batch_size + j) * 2 * N * N;
                double *current_matrix_imag = current_matrix_real + N * N;
                double *current_pfaffian_real = PFAFF_batch_real_imag + (i * inner_batch_size + j) * 2;
                double *current_pfaffian_imag = current_pfaffian_real + 1;
                double *current_inverse_real = INV_batch_real_imag + (i * inner_batch_size + j) * 2 * N * N;
                double *current_inverse_imag = current_inverse_real + N * N;

                // Copy the upper triangular part and negate it
                for (int row = 0; row < N; row++) {
                    for (int col = row + 1; col < N; col++) {
                        double complex value = current_matrix_real[row * N + col] + I * current_matrix_imag[row * N + col];
                        matrix_copy[row * N + col] = -value;
                        matrix_copy[col * N + row] = value;
                    }
                    matrix_copy[row * N + row] = 0.0;  // Diagonal elements should be zero
                }

                // Calculate Pfaffian
                double complex current_pfaffian;
                PFAPACK_zskpfa(&uplo, &mthd, &N, matrix_copy, &ldim, &current_pfaffian,
                              iwork, work, &lwork, rwork, &info);

                *current_pfaffian_real = creal(current_pfaffian);
                *current_pfaffian_imag = cimag(current_pfaffian);

                if (info != 0) {
                    free(matrix_copy);
                    free(work);
                    free(rwork);
                    free(ipiv);
                    free(iwork);
                    return -400 - info;
                }

                // Copy original matrix for inversion
                for (int row = 0; row < N; row++) {
                    for (int col = 0; col < N; col++) {
                        matrix_copy[row * N + col] = 
                            current_matrix_real[row * N + col] + I * current_matrix_imag[row * N + col];
                    }
                }

                // Compute inverse
                zgetrf_(&N, &N, matrix_copy, &ldim, ipiv, &info);
                if (info != 0) {
                    free(matrix_copy);
                    free(work);
                    free(rwork);
                    free(ipiv);
                    free(iwork);
                    return -300 - info;
                }

                zgetri_(&N, matrix_copy, &ldim, ipiv, work, &lwork, &info);
                if (info != 0) {
                    free(matrix_copy);
                    free(work);
                    free(rwork);
                    free(ipiv);
                    free(iwork);
                    return -200 - info;
                }

                // Store inverse in split real/imag format
                for (int row = 0; row < N; row++) {
                    for (int col = 0; col < N; col++) {
                        current_inverse_real[row * N + col] = creal(matrix_copy[row * N + col]);
                        current_inverse_imag[row * N + col] = cimag(matrix_copy[row * N + col]);
                    }
                }
            }
        }

        // Cleanup
        free(matrix_copy);
        free(work);
        free(rwork);
        free(ipiv);
        free(iwork);
    }
    else {
        // Handle N <= 0 case
        for (int i = 0; i < outer_batch_size * inner_batch_size; i++) {
            PFAFF_batch_real_imag[2 * i] = 1.0;
            PFAFF_batch_real_imag[2 * i + 1] = 0.0;
            if (N == 0) {
                for (int k = 0; k < 2 * N * N; k++) {
                    INV_batch_real_imag[i * 2 * N * N + k] = 0.0;
                }
            }
        }
    }

    return 0;
}


#ifdef __cplusplus
}
#endif
