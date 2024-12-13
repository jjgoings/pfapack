import numpy as np
import numpy.linalg
import pytest

import sys  # isort:skip

sys.path.append("..")

from pfapack import pfaffian as pf  # noqa isort:skip

from pfapack.ctypes import pfaffian_deriv_1


EPS = 1e-11

@pytest.mark.parametrize("n, n_sel, num_shadow, num_grid", [
    (5, 3, 13, 7),  # Original test case
    (6, 4, 10, 5),  # Larger matrix size
    (2, 1, 1, 1),   # Minimal case
    (10, 5, 20, 10) # Stress test
])
def test_pfaffian_deriv(n, n_sel, num_shadow, num_grid):
    """Test derivative of the Pfaffian computation with various configurations."""
    # Setup
    selector = np.linspace(0, n - 1, n_sel, dtype=int)  # Ensure exact `n_sel` length
    C_inv = np.random.randn(num_shadow, num_grid, n_sel, n_sel) + \
            1.0j * np.random.randn(num_shadow, num_grid, n_sel, n_sel)
    C_inv = np.ascontiguousarray(C_inv, dtype=np.complex128)

    dB = np.random.randn(num_shadow, n, n) + 1.0j * np.random.randn(num_shadow, n, n)
    dB = dB - dB.transpose((0, 2, 1))  # Ensure skew-symmetry
    dB = np.ascontiguousarray(dB, dtype=np.complex128)

    z = np.random.randn(num_grid)
    z = np.ascontiguousarray(z, dtype=np.float64)

    # Reference computation
    pfad = np.empty((num_shadow, num_grid), dtype=np.complex128)
    pfad_ref = np.empty((num_shadow, num_grid), dtype=np.complex128)
    for ii in range(num_shadow):
        for jj in range(num_grid):
            dbc = np.complex128(0)
            for i in range(n_sel):
                s_i = selector[i]
                for j in range(n_sel):
                    s_j = selector[j]
                    dbc += dB[ii, s_i, s_j] * C_inv[ii, jj, j, i]
            pfad_ref[ii, jj] = z[jj] * dbc

    # Call the function under test
    pfaffian_deriv_1(C_inv, dB, selector, z, pfad)

    # Assertions
    assert pfad.shape == pfad_ref.shape, "Output shape mismatch"
    assert np.linalg.norm(pfad - pfad_ref) < EPS, "Numerical mismatch with reference implementation"

    # Zero matrix checks
    zero_dB = np.zeros_like(dB)
    zero_pf = np.empty_like(pfad)
    pfaffian_deriv_1(C_inv, zero_dB, selector, z, zero_pf)
    assert np.allclose(zero_pf, 0), "Derivative with zero matrix should be zero"

    zero_z = np.zeros_like(z)
    zero_pf_z = np.empty_like(pfad)
    pfaffian_deriv_1(C_inv, dB, selector, zero_z, zero_pf_z)
    assert np.allclose(zero_pf_z, 0), "Derivative with zero vector z should be zero"
