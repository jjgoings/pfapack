import numpy as np
import numpy.linalg
import pytest

import sys  # isort:skip

sys.path.append("..")

from pfapack import pfaffian as pf  # noqa isort:skip

from pfapack.ctypes import pfaffian_deriv_1


EPS = 1e-11


def test_pfaffian_deriv():
    num_shadow = 13
    num_grid = 7
    n = 5

    # selector = np.array(range(n))
    selector = np.array([0, 2, 4])
    n_sel = len(selector)
    C_inv = np.array(np.random.randn(num_shadow, num_grid, n_sel, n_sel) + 1.0j * np.random.randn(num_shadow, num_grid, n_sel, n_sel), order="C")
    dB = np.array(np.random.randn(num_shadow, n, n) + 1.0j * np.random.randn(num_shadow, n, n), order="C")
    dB = dB - dB.transpose((0, 2, 1))
    z = np.array(np.random.randn(num_grid), order="C")

    pfad = np.empty((num_shadow, num_grid), order="C", dtype=np.complex128)
    pfad_ref = np.empty((num_shadow, num_grid), order="C", dtype=np.complex128)

    for ii in range(num_shadow):
        for jj in range(num_grid):
            dbc = np.complex128(0)
            for i in range(n_sel):
                s_i = selector[i]
                for j in range(n_sel):
                    s_j = selector[j]
                    dbc += dB[ii, s_i, s_j] * C_inv[ii, jj, j, i]
            pfad_ref[ii, jj] = z[jj] * dbc

    pfaffian_deriv_1(C_inv, dB, selector, z, pfad)

    assert np.linalg.norm(pfad - pfad_ref) < EPS

