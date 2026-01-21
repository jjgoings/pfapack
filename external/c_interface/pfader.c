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

static inline void pfapack_gather_db_mat_sel(
    doublecmplx *db_mat_sel,
    const doublecmplx *db_mat_shadow,
    const int *selector,
    int n_sel,
    int n_full
) {
    for (int i = 0; i < n_sel; i++) {
        const doublecmplx *db_mat_row = db_mat_shadow + (size_t)selector[i] * (size_t)n_full;
        doublecmplx *db_mat_sel_row = db_mat_sel + (size_t)i * (size_t)n_sel;
        for (int j = 0; j < n_sel; j++) {
            db_mat_sel_row[j] = db_mat_row[selector[j]];
        }
    }
}

static inline doublecmplx pfapack_trace_xxt(
    const doublecmplx *x_rowmajor,
    int n_sel
) {
    // Compute sum_{i,j} X[i,j] * X[j,i] (no conjugation).
    // This preserves the original loop order and is friendly to
    // pointer-based striding and compiler unrolling.
    doublecmplx res = 0.0;
    for (int im = 0; im < n_sel; im++) {
        const doublecmplx *row = x_rowmajor + (size_t)im * (size_t)n_sel;
        const doublecmplx *colp = x_rowmajor + im;
        int in = 0;
        for (; in + 3 < n_sel; in += 4) {
            res += row[in] * (*colp);
            colp += n_sel;
            res += row[in + 1] * (*colp);
            colp += n_sel;
            res += row[in + 2] * (*colp);
            colp += n_sel;
            res += row[in + 3] * (*colp);
            colp += n_sel;
        }
        for (; in < n_sel; in++) {
            res += row[in] * (*colp);
            colp += n_sel;
        }
    }
    return res;
}


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
        const doublecmplx *db_mat_shadow = db_mat + (size_t)ii * (size_t)N * (size_t)N;
        pfapack_gather_db_mat_sel(db_mat_sel, db_mat_shadow, selector, n_sel, N);
        doublecmplx *c_inv_i = matrices_c_inv + matrix_size * (size_t)n_grid * (size_t)ii;
        doublecmplx *pfaffian_deriv_i = pfaffian_deriv + (size_t)n_grid * (size_t)ii;
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
    if (posix_memalign(&buffer2, 64, matrix_size * sizeof(doublecmplx)) != 0) {
        free(buffer);
        return -100;
    }

    doublecmplx *db_mat_sel = (doublecmplx*)buffer;
    doublecmplx *c_inv_times_db_mat_sel = (doublecmplx*)buffer2;
    doublecmplx alpha = 1, beta = 0;

    for (int ii = 0; ii < n_sh; ii++) {
        const doublecmplx *db_mat_shadow = db_mat + (size_t)ii * (size_t)N * (size_t)N;
        pfapack_gather_db_mat_sel(db_mat_sel, db_mat_shadow, selector, n_sel, N);
        doublecmplx *pfaffian_deriv2_i = pfaffian_deriv2 + (size_t)n_grid * (size_t)ii;
        for (int jj = 0; jj < n_grid; jj++) {
            doublecmplx *c_inv_i = matrices_c_inv + matrix_size * ((size_t)n_grid * (size_t)ii + (size_t)jj);
            zgemm_(&trans, &trans, &n_sel, &n_sel, &n_sel, &alpha, c_inv_i, &n_sel, db_mat_sel, &n_sel, &beta, c_inv_times_db_mat_sel, &n_sel);
            doublecmplx res = pfapack_trace_xxt(c_inv_times_db_mat_sel, n_sel);
            const double w = weights[jj];
            pfaffian_deriv2_i[jj] = res * (w * w);
        }
    }

    free(buffer);
    free(buffer2);

    return 0;
}


#ifdef __cplusplus
}
#endif
