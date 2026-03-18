import json
import subprocess
import sys
import textwrap
from pathlib import Path

import numpy as np
import pytest

from pfapack.ctypes import pfaffian_batched
from pfapack.ctypes import pfaffian_batched_4d
from pfapack.ctypes import pfaffian_batched_4d_fortran
from pfapack.ctypes import pfaffian_batched_4d_with_inverse
from pfapack.ctypes import pfaffian_batched_4d_with_inverse_fortran


EPS = 1e-11


def _make_skew_3d(dtype, batch_size=7, matrix_size=8, seed=1234):
    rng = np.random.default_rng(seed)
    base = rng.standard_normal((batch_size, matrix_size, matrix_size))
    if dtype is np.complex128:
        base = base + 1j * rng.standard_normal(base.shape)
    base = base - np.transpose(base, (0, 2, 1))
    return np.array(base, dtype=dtype, order="C")


def _make_skew_4d(dtype, outer=4, inner=3, matrix_size=8, seed=5678):
    rng = np.random.default_rng(seed)
    base = rng.standard_normal((outer, inner, matrix_size, matrix_size))
    if dtype is np.complex128:
        base = base + 1j * rng.standard_normal(base.shape)
    base = base - np.transpose(base, (0, 1, 3, 2))
    return np.array(base, dtype=dtype, order="C")


def _make_noncontiguous_view(arr):
    padded = np.empty(arr.shape + (2,), dtype=arr.dtype)
    padded[..., 0] = arr
    padded[..., 1] = 0
    view = padded[..., 0]
    assert not view.flags["C_CONTIGUOUS"]
    return view


def _to_fortran_layout(arr):
    return np.asfortranarray(np.transpose(arr, (2, 3, 0, 1)))


@pytest.mark.parametrize("dtype", [np.float64, np.complex128])
def test_batched_3d_matches_across_input_layouts(dtype):
    matrices = _make_skew_3d(dtype)
    reference = pfaffian_batched(matrices)

    matrices_f = np.asfortranarray(matrices)
    matrices_nc = _make_noncontiguous_view(matrices)

    np.testing.assert_allclose(pfaffian_batched(matrices_f), reference, rtol=EPS, atol=EPS)
    np.testing.assert_allclose(pfaffian_batched(matrices_nc), reference, rtol=EPS, atol=EPS)


@pytest.mark.parametrize("dtype", [np.float64, np.complex128])
def test_batched_4d_matches_across_standard_layouts(dtype):
    matrices = _make_skew_4d(dtype)
    reference = pfaffian_batched_4d(matrices)

    matrices_f = np.asfortranarray(matrices)
    matrices_nc = _make_noncontiguous_view(matrices)

    np.testing.assert_allclose(pfaffian_batched_4d(matrices_f), reference, rtol=EPS, atol=EPS)
    np.testing.assert_allclose(pfaffian_batched_4d(matrices_nc), reference, rtol=EPS, atol=EPS)


@pytest.mark.parametrize("dtype", [np.float64, np.complex128])
def test_batched_4d_fortran_matches_across_input_layouts(dtype):
    matrices = _make_skew_4d(dtype)
    reference = pfaffian_batched_4d(matrices)

    matrices_fortran = _to_fortran_layout(matrices)
    matrices_fortran_nc = _make_noncontiguous_view(matrices_fortran)

    np.testing.assert_allclose(
        pfaffian_batched_4d_fortran(matrices_fortran), reference, rtol=EPS, atol=EPS
    )
    np.testing.assert_allclose(
        pfaffian_batched_4d_fortran(matrices_fortran_nc), reference, rtol=EPS, atol=EPS
    )


@pytest.mark.parametrize("dtype", [np.float64, np.complex128])
def test_batched_4d_with_inverse_matches_noncontiguous_input(dtype):
    matrices = _make_skew_4d(dtype, outer=3, inner=2, matrix_size=6, seed=2024)
    reference_pf, reference_inv = pfaffian_batched_4d_with_inverse(matrices.copy(), inplace=False)

    matrices_nc = _make_noncontiguous_view(matrices)
    original_nc = np.array(matrices_nc, copy=True)
    pf_nc, inv_nc = pfaffian_batched_4d_with_inverse(matrices_nc, inplace=False)

    np.testing.assert_allclose(pf_nc, reference_pf, rtol=EPS, atol=EPS)
    np.testing.assert_allclose(inv_nc, reference_inv, rtol=1e-9, atol=1e-9)
    np.testing.assert_array_equal(matrices_nc, original_nc)


@pytest.mark.parametrize("dtype", [np.float64, np.complex128])
def test_batched_4d_with_inverse_fortran_matches_noncontiguous_input(dtype):
    matrices = _make_skew_4d(dtype, outer=3, inner=2, matrix_size=6, seed=3030)
    reference_pf, reference_inv = pfaffian_batched_4d_with_inverse(matrices.copy(), inplace=False)

    matrices_fortran = _to_fortran_layout(matrices)
    matrices_fortran_nc = _make_noncontiguous_view(matrices_fortran)

    pf_f, inv_f = pfaffian_batched_4d_with_inverse_fortran(matrices_fortran_nc, inplace=False)
    inv_f_standard = np.transpose(inv_f, (2, 3, 0, 1))

    np.testing.assert_allclose(pf_f, reference_pf, rtol=EPS, atol=EPS)
    np.testing.assert_allclose(inv_f_standard, reference_inv, rtol=1e-9, atol=1e-9)


def test_batched_results_are_stable_across_fresh_processes_and_heap_noise():
    repo_root = Path(__file__).resolve().parents[1]
    script = textwrap.dedent(
        f"""
        import json
        import sys
        sys.path.insert(0, {str(repo_root)!r})
        import numpy as np
        from pfapack.ctypes import pfaffian_batched_4d, pfaffian_batched_4d_fortran

        seed = int(sys.argv[1])
        jitter_bytes = int(sys.argv[2])
        jitter_count = int(sys.argv[3])

        junk = [bytearray(jitter_bytes) for _ in range(jitter_count)]
        for buf in junk:
            if buf:
                buf[0] = 1
                buf[-1] = 1

        rng = np.random.default_rng(seed)
        outer, inner, n = 3, 2, 8
        mats = rng.standard_normal((outer, inner, n, n)) + 1j * rng.standard_normal((outer, inner, n, n))
        mats = mats - np.transpose(mats, (0, 1, 3, 2))
        mats = np.ascontiguousarray(mats, dtype=np.complex128)
        mats_f = np.asfortranarray(np.transpose(mats, (2, 3, 0, 1)))

        pf_std = pfaffian_batched_4d(mats)
        pf_f = pfaffian_batched_4d_fortran(mats_f)

        payload = {{
            "standard_real": np.real(pf_std).tolist(),
            "standard_imag": np.imag(pf_std).tolist(),
            "fortran_real": np.real(pf_f).tolist(),
            "fortran_imag": np.imag(pf_f).tolist(),
        }}
        print(json.dumps(payload, sort_keys=True))
        """
    )

    baseline = None
    for jitter_bytes in (0, 1 << 20, 3 << 20):
        completed = subprocess.run(
            [sys.executable, "-c", script, "4242", str(jitter_bytes), "4"],
            check=True,
            capture_output=True,
            text=True,
        )
        payload = json.loads(completed.stdout)

        pf_std = np.array(payload["standard_real"]) + 1j * np.array(payload["standard_imag"])
        pf_f = np.array(payload["fortran_real"]) + 1j * np.array(payload["fortran_imag"])

        np.testing.assert_allclose(pf_f, pf_std, rtol=EPS, atol=EPS)
        if baseline is None:
            baseline = pf_std
        else:
            np.testing.assert_allclose(pf_std, baseline, rtol=EPS, atol=EPS)
