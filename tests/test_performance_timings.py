import numpy as np
import pytest

from pfapack import pfaffian as pfa
from pfapack.ctypes import (
    pfaffian as cpfaffian,
    pfaffian_batched as cpfaffian_batched,
    pfaffian_batched_4d as cpfaffian_batched_4d,
)


def _skew_matrices(outer_batch: int, inner_batch: int, n: int, seed: int = 0) -> np.ndarray:
    """Generate complex skew-symmetric batches for reproducible timings."""
    if n % 2:  # Pfaffian routines expect even dimension
        raise ValueError("Matrix dimension must be even.")
    rng = np.random.default_rng(seed)
    data = rng.standard_normal((outer_batch, inner_batch, n, n))
    data = data + 1j * rng.standard_normal((outer_batch, inner_batch, n, n))
    return data - np.transpose(data, (0, 1, 3, 2))


@pytest.fixture(scope="module")
def benchmark_input() -> np.ndarray:
    # Keep batches modest so benchmark calibration remains fast under CI.
    outer_batch = 6
    n = 8
    inner_batch = n // 2 + 1  # mirrors the example heuristic
    return _skew_matrices(outer_batch, inner_batch, n, seed=42)


@pytest.fixture(scope="module")
def python_reference(benchmark_input: np.ndarray) -> np.ndarray:
    results = [[pfa.pfaffian(mat) for mat in row] for row in benchmark_input]
    return np.asarray(results, dtype=np.complex128)


def _python_loop(batch: np.ndarray) -> np.ndarray:
    return np.asarray([[pfa.pfaffian(mat) for mat in row] for row in batch], dtype=np.complex128)


def _c_loop(batch: np.ndarray) -> np.ndarray:
    return np.asarray([[cpfaffian(mat) for mat in row] for row in batch], dtype=np.complex128)


def _batched_3d(batch: np.ndarray) -> np.ndarray:
    return np.vstack([cpfaffian_batched(row) for row in batch])


def _batched_4d(batch: np.ndarray) -> np.ndarray:
    return cpfaffian_batched_4d(batch)


TIMED_METHODS = [
    ("python_loop", _python_loop),
    ("c_loop", _c_loop),
    ("batched_3d", _batched_3d),
    ("batched_4d", _batched_4d),
]


@pytest.mark.parametrize("label, runner", TIMED_METHODS)
def test_pfaffian_timings(label: str, runner, benchmark, benchmark_input, python_reference):
    benchmark.group = "pfaffian_batched"
    benchmark.name = label
    benchmark.extra_info.update(
        method=label,
        outer_batch=int(benchmark_input.shape[0]),
        inner_batch=int(benchmark_input.shape[1]),
        matrix_size=int(benchmark_input.shape[2]),
    )

    def op():
        return runner(benchmark_input)

    result = benchmark(op)
    np.testing.assert_allclose(np.asarray(result), python_reference, atol=1e-11)
