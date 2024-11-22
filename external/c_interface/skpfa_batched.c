#include "commondefs.h"
#include "fortran.h"
#include "fortran_pfapack.h"
#include "pfapack.h"
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

int skpfa_batched_4d_z_with_inverse(int outer_batch_size, int inner_batch_size, int N,
                                       double *A_batch_real_imag, double *PFAFF_batch_real_imag,
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
        double *rwork = NULL;
        int *iwork = NULL, *ipiv = NULL;
        doublecmplx *work = NULL, *matrix = NULL;

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

        // Query optimal workspace size for both Pfaffian and inverse
        int lwork = -1;
        doublecmplx work_query;
        
        // Query for Pfaffian
        PFAPACK_zskpfa(&uplo, &mthd, &N, NULL, &ldim, &work_query,
                       iwork, &work_query, &lwork, rwork, &info);
        int lwork_pf = (int)creal(work_query);
        
        // Query for inverse
        zgetri_(&N, NULL, &ldim, NULL, &work_query, &lwork, &info);
        int lwork_inv = (int)creal(work_query);
        
        // Use the larger workspace
        lwork = (lwork_pf > lwork_inv) ? lwork_pf : lwork_inv;
        work = (doublecmplx *)malloc(sizeof(doublecmplx) * lwork);
        if (!work) {
            free(rwork);
            free(ipiv);
            free(iwork);
            return -100;
        }

        matrix = (doublecmplx *)malloc(sizeof(doublecmplx) * N * N);
        if (!matrix) {
            free(work);
            free(rwork);
            free(ipiv);
            free(iwork);
            return -103;
        }

        // Process each matrix in the 4D batch
        for (int i = 0; i < outer_batch_size; i++) {
            for (int j = 0; j < inner_batch_size; j++) {
                double *current_matrix_real = A_batch_real_imag + ((i * inner_batch_size + j) * 2 * N * N);
                double *current_matrix_imag = current_matrix_real + N * N;
                double *current_pfaffian_real = PFAFF_batch_real_imag + ((i * inner_batch_size + j) * 2);
                double *current_pfaffian_imag = current_pfaffian_real + 1;

                // Correctly convert to complex format
                for (int col = 0; col < N; col++) {
                    for (int row = 0; row < N; row++) {
                        #if defined(CPLUSPLUS_COMPLEX)
                            matrix[col * N + row] = doublecmplx(
                                current_matrix_real[row * N + col],
                                current_matrix_imag[row * N + col]);
                        #elif defined(C99_COMPLEX)
                            matrix[col * N + row] = 
                                current_matrix_real[row * N + col] + 
                                _Complex_I * current_matrix_imag[row * N + col];
                        #else
                            matrix[col * N + row].re = current_matrix_real[row * N + col];
                            matrix[col * N + row].im = current_matrix_imag[row * N + col];
                        #endif
                    }
                }

                // Calculate Pfaffian
                doublecmplx current_pfaffian;
                PFAPACK_zskpfa(&uplo, &mthd, &N, matrix, &ldim, &current_pfaffian,
                              iwork, work, &lwork, rwork, &info);

                if (info == 0) {
                    // Store Pfaffian result
                    *current_pfaffian_real = creal(current_pfaffian);
                    *current_pfaffian_imag = cimag(current_pfaffian);

                    // Reconstruct the original matrix before inversion
                    for (int col = 0; col < N; col++) {
                        for (int row = 0; row < N; row++) {
                            #if defined(CPLUSPLUS_COMPLEX)
                                matrix[col * N + row] = doublecmplx(
                                    current_matrix_real[row * N + col],
                                    current_matrix_imag[row * N + col]);
                            #elif defined(C99_COMPLEX)
                                matrix[col * N + row] = 
                                    current_matrix_real[row * N + col] + 
                                    _Complex_I * current_matrix_imag[row * N + col];
                            #else
                                matrix[col * N + row].re = current_matrix_real[row * N + col];
                                matrix[col * N + row].im = current_matrix_imag[row * N + col];
                            #endif
                        }
                    }

                    // Compute matrix inverse using LU decomposition
                    zgetrf_(&N, &N, matrix, &ldim, ipiv, &info);
                    if (info == 0) {
                        zgetri_(&N, matrix, &ldim, ipiv, work, &lwork, &info);
                        if (info == 0) {
                            // Correctly copy the inverse back
                            for (int col = 0; col < N; col++) {
                                for (int row = 0; row < N; row++) {
                                    current_matrix_real[row * N + col] = creal(matrix[col * N + row]);
                                    current_matrix_imag[row * N + col] = cimag(matrix[col * N + row]);
                                }
                            }
                        } else {
                            // Handle inversion error
                            free(matrix);
                            free(work);
                            free(rwork);
                            free(ipiv);
                            free(iwork);
                            return -200 - info; // Adjust error code as needed
                        }
                    } else {
                        // Handle LU decomposition error
                        free(matrix);
                        free(work);
                        free(rwork);
                        free(ipiv);
                        free(iwork);
                        return -300 - info; // Adjust error code as needed
                    }
                } else {
                    // Handle Pfaffian computation error
                    free(matrix);
                    free(work);
                    free(rwork);
                    free(ipiv);
                    free(iwork);
                    return -400 - info; // Adjust error code as needed
                }
            }
        }

        free(matrix);
        free(work);
        free(rwork);
        free(ipiv);
        free(iwork);
    }
    else {
        // If N <= 0, set Pfaffians to 1
        for (int i = 0; i < outer_batch_size * inner_batch_size; i++) {
            PFAFF_batch_real_imag[2 * i] = 1.0;
            PFAFF_batch_real_imag[2 * i + 1] = 0.0;
        }
    }

    return 0;
}


#ifdef __cplusplus
}
#endif
