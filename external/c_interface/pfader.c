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


int pfader_1(int n_sh,
             int n_grid, double *weights,
             int n_sel, int *selector,
             int N, doublecmplx *db_mat,
             doublecmplx *matrices_c_inv,
             doublecmplx *pfaffian_deriv)
{
    char trans = 'T';

    const size_t matrix_size = (size_t)n_sel * n_sel;
    void *buffer = NULL;
    if (posix_memalign(&buffer, 64, matrix_size * sizeof(doublecmplx)) != 0)
        return -100;

    doublecmplx *db_mat_sel = (doublecmplx*)buffer;
    doublecmplx alpha = -1, beta = 0;
    int m = matrix_size, n = n_grid, inc = 1;

    for (int ii = 0; ii < n_sh; ii++) {
        for (int i = 0; i < n_sel; i++) {
            doublecmplx *db_mat_i = db_mat + ii * N * N + selector[i] * N;
            doublecmplx *db_mat_sel_i = db_mat_sel + i * n_sel;
            for (int j = 0; j < n_sel; j++) {
                db_mat_sel_i[j] = db_mat_i[selector[j]];
            }
        }
        doublecmplx *c_inv_i = matrices_c_inv + matrix_size * n_grid * ii;
        doublecmplx *pfaffian_deriv_i = pfaffian_deriv + n_grid * ii;
        zgemv_(&trans, &m, &n, &alpha, c_inv_i, &m, db_mat_sel, &inc, &beta, pfaffian_deriv_i, &inc);
        for (int jj = 0; jj < n_grid; jj++) {
            pfaffian_deriv_i[jj] *= weights[jj];
        }
    }

    free(buffer);

    return 0;
}

int pfader_2(int n_sh,
             int n_grid, double *weights,
             int n_sel, int *selector,
             int N, doublecmplx *db_mat,
             doublecmplx *matrices_c_inv,
             doublecmplx *pfaffian_deriv2)
{
    char trans = 'T';

    const size_t matrix_size = (size_t)n_sel * n_sel;
    void *buffer = NULL;
    if (posix_memalign(&buffer, 64, matrix_size * sizeof(doublecmplx)) != 0)
        return -100;

    void *buffer2 = NULL;
    if (posix_memalign(&buffer2, 64, matrix_size * sizeof(doublecmplx)) != 0)
        return -100;

    doublecmplx *db_mat_sel = (doublecmplx*)buffer;
    doublecmplx *c_inv_times_db_mat_sel = (doublecmplx*)buffer2;
    doublecmplx alpha = 1, beta = 0;
    int m = matrix_size, n = n_grid, inc = 1;

    for (int ii = 0; ii < n_sh; ii++) {
        for (int i = 0; i < n_sel; i++) {
            doublecmplx *db_mat_i = db_mat + ii * N * N + selector[i] * N;
            doublecmplx *db_mat_sel_i = db_mat_sel + i * n_sel;
            for (int j = 0; j < n_sel; j++) {
                db_mat_sel_i[j] = db_mat_i[selector[j]];      
            }
        }
        doublecmplx *pfaffian_deriv2_i = pfaffian_deriv2 + n_grid * ii; 
        // compute c_inv * db_mat_sel, and overwrite c_inv
        for (int jj = 0; jj < n_grid; jj++) {
            doublecmplx *c_inv_i = matrices_c_inv + matrix_size * (n_grid * ii + jj);
            zgemm_(&trans, &trans, &n_sel, &n_sel, &n_sel, &alpha, c_inv_i, &n_sel, db_mat_sel, &n_sel, &beta, c_inv_times_db_mat_sel, &n_sel);
            // trace
            doublecmplx res = 0.0; 
            for (int im = 0; im < n_sel; im++){
                for (int in = 0; in < n_sel; in++){
                    res += (c_inv_times_db_mat_sel[im*n_sel+in] * c_inv_times_db_mat_sel[in*n_sel+im]);
                }
            }
            pfaffian_deriv2_i[jj] = res * (weights[jj] * weights[jj]);
        }
    }

    free(buffer);
    free(buffer2);

    return 0;
}


#ifdef __cplusplus
}
#endif
