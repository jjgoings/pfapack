"""Quick-and-dirty benchmark for overlap-style Pfaffian batches.

This script is meant to mimic the tight loop inside
``compute_overlap_interpolative`` by building a complex skew-symmetric
4D tensor and timing repeated calls to ``pfaffian_batched_4d`` (and,
optionally, ``pfaffian_batched_4d_with_inverse``).

Usage (defaults chosen to stay fast enough for CI):

    python examples/08-overlap-benchmark.py --outer-batch 128 --inner-batch 8 \
        --matrix-size 32 --repeats 10

The benchmark prints per-repeat timings plus an aggregate summary so we
can capture a "before" baseline ahead of optimisation work.
"""

from __future__ import annotations

import argparse
import statistics
import time
from typing import Callable, Iterable

import numpy as np

from pfapack.ctypes import (
    pfaffian_batched_4d,
    pfaffian_batched_4d_fortran,
    pfaffian_batched_4d_with_inverse,
    pfaffian_batched_4d_with_inverse_fortran,
)


def _make_skew_batch(
    outer_batch: int,
    inner_batch: int,
    matrix_size: int,
    seed: int,
) -> np.ndarray:
    """Generate a complex, skew-symmetric batch with C-contiguous layout."""
    rng = np.random.default_rng(seed)
    shape = (outer_batch, inner_batch, matrix_size, matrix_size)
    data = rng.standard_normal(shape) + 1j * rng.standard_normal(shape)
    # Enforce strict skew-symmetry (zero diagonal, -transpose)
    data = data - np.transpose(data, (0, 1, 3, 2))
    flattened = data.reshape(-1, matrix_size, matrix_size)
    idx = np.arange(matrix_size)
    flattened[:, idx, idx] = 0.0
    return np.array(data, dtype=np.complex128, order="C")


def _make_skew_batch_fortran(
    outer_batch: int,
    inner_batch: int,
    matrix_size: int,
    seed: int,
) -> np.ndarray:
    """Generate a batch already arranged as (N, N, outer, inner) in Fortran order."""
    rng = np.random.default_rng(seed)
    data = np.empty((matrix_size, matrix_size, outer_batch, inner_batch), dtype=np.complex128, order="F")
    for o in range(outer_batch):
        for i in range(inner_batch):
            block = rng.standard_normal((matrix_size, matrix_size)) + 1j * rng.standard_normal((matrix_size, matrix_size))
            block = block - block.T
            np.fill_diagonal(block, 0.0)
            data[:, :, o, i] = block
    return data


def _time_call(func: Callable[..., object], *args: object, **kwargs: object) -> float:
    start = time.perf_counter()
    func(*args, **kwargs)
    return time.perf_counter() - start


def _report(name: str, timings: Iterable[float]) -> None:
    timings = list(timings)
    if not timings:
        return
    print(f"{name} timings (seconds):")
    for idx, t in enumerate(timings, start=1):
        print(f"  run {idx:2d}: {t:.6f}")
    print(
        "  summary: min={:.6f} mean={:.6f} median={:.6f} max={:.6f}"
        .format(min(timings), statistics.mean(timings), statistics.median(timings), max(timings))
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--outer-batch", type=int, default=128, help="Number of shadow samples per batch")
    parser.add_argument("--inner-batch", type=int, default=8, help="Grid points per shadow")
    parser.add_argument("--matrix-size", type=int, default=32, help="Side length of the skew-symmetric block")
    parser.add_argument("--repeats", type=int, default=5, help="How many timed runs to perform")
    parser.add_argument("--seed", type=int, default=1234, help="PRNG seed for reproducibility")
    parser.add_argument(
        "--with-inverse",
        action="store_true",
        help="Time pfaffian_batched_4d_with_inverse in addition to the plain path",
    )
    parser.add_argument(
        "--with-fortran",
        action="store_true",
        help="Time the experimental pfaffian_batched_4d_fortran helper as well",
    )

    args = parser.parse_args()

    matrices = _make_skew_batch(args.outer_batch, args.inner_batch, args.matrix_size, args.seed)

    print(
        "Benchmarking pfaffian_batched_4d on batch="
        f"({args.outer_batch}, {args.inner_batch}, {args.matrix_size}, {args.matrix_size})"
    )
    plain_timings = [_time_call(pfaffian_batched_4d, matrices) for _ in range(args.repeats)]
    _report("pfaffian_batched_4d", plain_timings)

    if args.with_fortran:
        matrices_fortran = _make_skew_batch_fortran(
            args.outer_batch,
            args.inner_batch,
            args.matrix_size,
            args.seed,
        )
        fortran_timings = [
            _time_call(pfaffian_batched_4d_fortran, matrices_fortran) for _ in range(args.repeats)
        ]
        _report("pfaffian_batched_4d_fortran", fortran_timings)

    if args.with_inverse:
        inverse_timings = []
        for _ in range(args.repeats):
            matrices_work = matrices.copy(order="C")
            t = _time_call(pfaffian_batched_4d_with_inverse, matrices_work, inplace=True)
            inverse_timings.append(t)
        _report("pfaffian_batched_4d_with_inverse", inverse_timings)

        if args.with_fortran:
            matrices_fortran = _make_skew_batch_fortran(
                args.outer_batch,
                args.inner_batch,
                args.matrix_size,
                args.seed,
            )
            inverse_fortran_timings = []
            for _ in range(args.repeats):
                matrices_work = matrices_fortran.copy(order="F")
                t = _time_call(
                    pfaffian_batched_4d_with_inverse_fortran,
                    matrices_work,
                    inplace=True,
                )
                inverse_fortran_timings.append(t)
            _report("pfaffian_batched_4d_with_inverse_fortran", inverse_fortran_timings)


if __name__ == "__main__":
    main()
