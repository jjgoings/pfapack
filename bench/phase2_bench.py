#!/usr/bin/env python3

"""Phase 2 benchmark harness for PFAPACK (single-threaded, memory-aware).

This script benchmarks two representative batched workloads:

1) Tomography-style: pfaffian + inverse + deriv1 + deriv2 on a 4D batch
2) Many-small-matrices: pfaffian-only on a large 4D batch of small matrices

It generates deterministic skew-symmetric inputs, runs optional correctness
validation on small cases, and reports baseline wall-clock statistics plus
basic OS-level memory counters.

Notes (macOS):
- Hardware cache-miss counters like Linux `perf stat` are not available by
  default. We report wall-clock and basic `getrusage` deltas (RSS/page faults).
"""

from __future__ import annotations

import argparse
import json
import math
import os
import platform
import resource
import statistics
import subprocess
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Callable, Iterable, Literal


def _force_single_thread() -> None:
    """Best-effort single-thread enforcement for BLAS/OpenMP backends."""

    # Must be set before importing NumPy/SciPy to be effective.
    os.environ.setdefault("OMP_NUM_THREADS", "1")
    os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
    os.environ.setdefault("MKL_NUM_THREADS", "1")
    os.environ.setdefault("VECLIB_MAXIMUM_THREADS", "1")
    os.environ.setdefault("NUMEXPR_NUM_THREADS", "1")


_force_single_thread()

import numpy as np  # noqa: E402


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


sys.path.insert(0, str(_repo_root()))

from pfapack.ctypes import pfaffian as cpfaffian  # noqa: E402
from pfapack.ctypes import pfaffian_batched_4d  # noqa: E402

# Optional imports for tomography workload (may not exist in older versions)
try:
    from pfapack.ctypes import pfaffian_batched_4d_with_inverse  # noqa: E402
    from pfapack.ctypes import pfaffian_deriv_1, pfaffian_deriv_2  # noqa: E402
    HAS_TOMOGRAPHY_FUNCS = True
except ImportError:
    HAS_TOMOGRAPHY_FUNCS = False
    pfaffian_batched_4d_with_inverse = None  # type: ignore
    pfaffian_deriv_1 = None  # type: ignore
    pfaffian_deriv_2 = None  # type: ignore


def _sysctl(key: str) -> str | None:
    try:
        out = subprocess.check_output(["sysctl", "-n", key], stderr=subprocess.DEVNULL)
    except Exception:
        return None
    return out.decode().strip()


def _macos_cache_info() -> dict[str, Any]:
    out: dict[str, Any] = {}
    for key in (
        "hw.cachelinesize",
        "hw.l2cachesize",
        "hw.cachesize",
        "hw.cacheconfig",
    ):
        val = _sysctl(key)
        if val is None:
            continue
        out[key] = val
    return out


def system_info() -> dict[str, Any]:
    info: dict[str, Any] = {
        "date": time.strftime("%Y-%m-%d %H:%M:%S %z"),
        "python": sys.version.split()[0],
        "numpy": np.__version__,
        "platform": platform.platform(),
        "machine": platform.machine(),
        "processor": platform.processor(),
        "env": {
            k: os.environ.get(k)
            for k in (
                "OMP_NUM_THREADS",
                "OPENBLAS_NUM_THREADS",
                "MKL_NUM_THREADS",
                "VECLIB_MAXIMUM_THREADS",
                "NUMEXPR_NUM_THREADS",
            )
        },
        "hw": {
            "cpu": _sysctl("machdep.cpu.brand_string"),
            "model": _sysctl("hw.model"),
            "ncpu": _sysctl("hw.ncpu"),
            "memsize": _sysctl("hw.memsize"),
        },
    }
    if sys.platform == "darwin":
        info["hw"]["caches"] = _macos_cache_info()
    return info


def _rusage_snapshot() -> dict[str, int]:
    r = resource.getrusage(resource.RUSAGE_SELF)
    # On macOS, ru_maxrss is in bytes.
    return {
        "ru_maxrss": int(r.ru_maxrss),
        "ru_minflt": int(r.ru_minflt),
        "ru_majflt": int(r.ru_majflt),
        "ru_inblock": int(r.ru_inblock),
        "ru_oublock": int(r.ru_oublock),
        "ru_nvcsw": int(r.ru_nvcsw),
        "ru_nivcsw": int(r.ru_nivcsw),
    }


def _dict_delta(after: dict[str, int], before: dict[str, int]) -> dict[str, int]:
    keys = set(before) | set(after)
    return {k: int(after.get(k, 0) - before.get(k, 0)) for k in sorted(keys)}


def _bytes(n: int) -> str:
    units = ["B", "KiB", "MiB", "GiB", "TiB"]
    f = float(n)
    for u in units:
        if f < 1024.0 or u == units[-1]:
            return f"{f:.2f} {u}"
        f /= 1024.0
    return f"{n} B"


def _stats(samples: list[float]) -> dict[str, float]:
    if not samples:
        return {"n": 0}
    out: dict[str, float] = {
        "n": float(len(samples)),
        "mean": float(statistics.mean(samples)),
        "min": float(min(samples)),
        "max": float(max(samples)),
    }
    if len(samples) >= 2:
        out["stdev"] = float(statistics.stdev(samples))
    else:
        out["stdev"] = 0.0
    return out


def _make_selector(n_full: int, n_sel: int) -> np.ndarray:
    """Deterministic selection indices (spread across the full dimension)."""
    if n_sel > n_full:
        raise ValueError("n_sel must be <= n_full")
    if n_sel == n_full:
        return np.arange(n_full, dtype=np.int32)
    # Evenly-spaced indices, deterministic.
    idx = np.linspace(0, n_full - 1, n_sel, dtype=int)
    return np.asarray(idx, dtype=np.int32)


def _skewify(a: np.ndarray) -> np.ndarray:
    return 0.5 * (a - np.swapaxes(a, -1, -2))


def _skew_random(shape: tuple[int, ...], rng: np.random.Generator, dtype: Any) -> np.ndarray:
    if dtype == np.complex128:
        x = rng.standard_normal(shape) + 1j * rng.standard_normal(shape)
        x = x.astype(np.complex128, copy=False)
    elif dtype == np.float64:
        x = rng.standard_normal(shape).astype(np.float64, copy=False)
    else:
        raise TypeError(f"unsupported dtype: {dtype}")
    return _skewify(x)


def _invertible_skew_batch(
    *,
    outer: int,
    inner: int,
    n: int,
    rng: np.random.Generator,
    dtype: Any = np.complex128,
    diag_scale: float = 1.0,
    noise_scale: float = 0.02,
) -> np.ndarray:
    """Deterministic, dense, invertible skew-symmetric batch.

    Construction: block-diagonal 2x2 skew matrix (guaranteed invertible) + small
    dense skew-symmetric noise to avoid being too structured.
    """
    if n % 2:
        raise ValueError("n must be even for Pfaffians")

    mats = _skew_random((outer, inner, n, n), rng, dtype)
    mats *= noise_scale

    # Add a guaranteed-invertible skew-symmetric block diagonal.
    base = np.zeros((n, n), dtype=dtype)
    for k in range(0, n, 2):
        lam = diag_scale * (1.0 + 0.01 * (k // 2))
        base[k, k + 1] = lam
        base[k + 1, k] = -lam
    mats += base[None, None, :, :]

    # Enforce skew-symmetry robustly.
    mats = _skewify(mats)
    # Force C-contiguous (benchmarks the default C-order API path).
    return np.ascontiguousarray(mats)


def _validate_pfaffians_against_scalar(mats_4d: np.ndarray, *, atol: float = 1e-11) -> None:
    """Cross-check batched pfaffians vs scalar C wrapper on a small sample."""
    pf_batched = pfaffian_batched_4d(mats_4d)
    outer, inner, n, _ = mats_4d.shape
    for i in range(min(outer, 3)):
        for j in range(min(inner, 3)):
            ref = cpfaffian(mats_4d[i, j])
            got = pf_batched[i, j]
            if not np.allclose(got, ref, atol=atol, rtol=0):
                raise AssertionError(f"pfaffian mismatch at ({i},{j}): got {got}, ref {ref}")


def _validate_inverse(mats: np.ndarray, invs: np.ndarray, *, atol: float = 1e-9) -> None:
    """Check A @ A^{-1} ≈ I for a few items."""
    outer, inner, n, _ = mats.shape
    eye = np.eye(n, dtype=np.complex128)
    for i in range(min(outer, 2)):
        for j in range(min(inner, 2)):
            a = np.asarray(mats[i, j])
            ainv = np.asarray(invs[i, j])
            prod = a @ ainv
            if not np.allclose(prod, eye, atol=atol, rtol=0):
                raise AssertionError(f"inverse check failed at ({i},{j}); max|A@Ainv-I|={np.max(np.abs(prod-eye))}")


def _deriv1_reference(
    *,
    cinv: np.ndarray,
    db: np.ndarray,
    selector: np.ndarray,
    weights: np.ndarray,
) -> np.ndarray:
    """Reference for pfaffian_deriv_1 matching pfader_1/test convention.

    Matches tests/test_pfaffian_deriv.py: sum_{i,j} dB[s_i,s_j] * Cinv[j,i].
    """
    n_sh, n_grid, n_sel, _ = cinv.shape
    out = np.empty((n_sh, n_grid), dtype=np.complex128)
    s = selector.astype(int)
    for ii in range(n_sh):
        db_sel = db[ii][np.ix_(s, s)]
        for jj in range(n_grid):
            out[ii, jj] = weights[jj] * np.sum(db_sel * cinv[ii, jj].T)
    return out


def _deriv2_reference(
    *,
    cinv: np.ndarray,
    db: np.ndarray,
    selector: np.ndarray,
    weights: np.ndarray,
) -> np.ndarray:
    """Reference for pfaffian_deriv_2 matching pfader_2.

    pfader_2 does X = Cinv^T * dB^T (no conjugation) then returns trace(X*X) * w^2.
    """
    n_sh, n_grid, n_sel, _ = cinv.shape
    out = np.empty((n_sh, n_grid), dtype=np.complex128)
    s = selector.astype(int)
    for ii in range(n_sh):
        db_sel = db[ii][np.ix_(s, s)]
        for jj in range(n_grid):
            x = cinv[ii, jj].T @ db_sel.T
            out[ii, jj] = (weights[jj] * weights[jj]) * np.sum(x * x.T)
    return out


@dataclass(frozen=True)
class BenchResult:
    name: str
    seconds: list[float]
    rusage_delta: list[dict[str, int]]
    bytes_input: int
    bytes_output: int


def _run_repeated(
    *,
    name: str,
    fn: Callable[[], Any],
    iters: int,
    warmup: int,
    bytes_input: int,
    bytes_output: int,
) -> BenchResult:
    for _ in range(max(0, warmup)):
        fn()

    seconds: list[float] = []
    rusage_deltas: list[dict[str, int]] = []
    for _ in range(iters):
        before = _rusage_snapshot()
        t0 = time.perf_counter()
        fn()
        t1 = time.perf_counter()
        after = _rusage_snapshot()
        seconds.append(t1 - t0)
        rusage_deltas.append(_dict_delta(after, before))

    return BenchResult(
        name=name,
        seconds=seconds,
        rusage_delta=rusage_deltas,
        bytes_input=bytes_input,
        bytes_output=bytes_output,
    )


def workload_tomography(
    *,
    nshadow: int,
    ngrid: int,
    n_sel: int,
    n_full: int,
    seed: int,
    method: Literal["P", "H"] = "P",
    validate: bool,
) -> tuple[Callable[[], dict[str, Any]], dict[str, Any]]:
    rng = np.random.default_rng(seed)
    weights = np.linspace(0.0, float(ngrid - 1), ngrid, dtype=np.float64)

    selector = _make_selector(n_full, n_sel)
    db_mat = _skew_random((nshadow, n_full, n_full), rng, np.complex128)
    db_mat = np.ascontiguousarray(db_mat, dtype=np.complex128)

    # Deterministic, invertible C(z) batch (C-order) used as input template.
    c_template = _invertible_skew_batch(
        outer=nshadow,
        inner=ngrid,
        n=n_sel,
        rng=rng,
        dtype=np.complex128,
        diag_scale=1.0,
        noise_scale=0.02,
    )

    # Outputs reused across iterations.
    out_d1 = np.empty((nshadow, ngrid), dtype=np.complex128)
    out_d2 = np.empty((nshadow, ngrid), dtype=np.complex128)

    if validate:
        # Small-case validation that the library wiring is correct.
        small = c_template[: min(nshadow, 4), : min(ngrid, 4)].copy(order="C")
        _validate_pfaffians_against_scalar(small)

        pf, inv = pfaffian_batched_4d_with_inverse(small, inplace=True, method=method)
        # Since inplace=True, inv is `small`.
        _validate_inverse(c_template[: pf.shape[0], : pf.shape[1]], inv, atol=5e-8)

        got1 = np.empty_like(out_d1[: pf.shape[0], : pf.shape[1]])
        got2 = np.empty_like(out_d2[: pf.shape[0], : pf.shape[1]])
        pfaffian_deriv_1(inv, db_mat[: pf.shape[0]], selector, weights[: pf.shape[1]], got1)
        pfaffian_deriv_2(inv, db_mat[: pf.shape[0]], selector, weights[: pf.shape[1]], got2)
        ref1 = _deriv1_reference(
            cinv=inv,
            db=db_mat[: pf.shape[0]],
            selector=selector,
            weights=weights[: pf.shape[1]],
        )
        ref2 = _deriv2_reference(
            cinv=inv,
            db=db_mat[: pf.shape[0]],
            selector=selector,
            weights=weights[: pf.shape[1]],
        )
        if not np.allclose(got1, ref1, atol=1e-10, rtol=0):
            raise AssertionError("pfaffian_deriv_1 mismatch vs reference")
        if not np.allclose(got2, ref2, atol=1e-9, rtol=0):
            raise AssertionError("pfaffian_deriv_2 mismatch vs reference")

    def run_once() -> dict[str, Any]:
        # Mirror the real caller behavior: matrices are built (or copied) and
        # then overwritten with inverses in-place.
        c_work = c_template.copy(order="C")
        pf, c_inv = pfaffian_batched_4d_with_inverse(c_work, inplace=True, method=method)
        pfaffian_deriv_1(c_inv, db_mat, selector, weights, out_d1)
        pfaffian_deriv_2(c_inv, db_mat, selector, weights, out_d2)

        # Return a small checksum to prevent accidental removal of work.
        return {
            "pf_sum": complex(np.sum(pf)),
            "d1_sum": complex(np.sum(out_d1)),
            "d2_sum": complex(np.sum(out_d2)),
        }

    bytes_input = int(c_template.nbytes + db_mat.nbytes + weights.nbytes + selector.nbytes)
    bytes_output = int(out_d1.nbytes + out_d2.nbytes + (nshadow * ngrid * 16))
    meta = {
        "workload": "tomography",
        "nshadow": int(nshadow),
        "ngrid": int(ngrid),
        "n_sel": int(n_sel),
        "n_full": int(n_full),
        "method": method,
        "dtype": "complex128",
        "bytes_input": bytes_input,
        "bytes_output": bytes_output,
    }
    return run_once, meta


def workload_many_small(
    *,
    outer: int,
    inner: int,
    n: int,
    seed: int,
    method: Literal["P", "H"] = "P",
    validate: bool,
) -> tuple[Callable[[], dict[str, Any]], dict[str, Any]]:
    rng = np.random.default_rng(seed)
    mats = _skew_random((outer, inner, n, n), rng, np.complex128)
    mats = np.ascontiguousarray(mats, dtype=np.complex128)

    if validate:
        _validate_pfaffians_against_scalar(mats[: min(outer, 4), : min(inner, 4)])

    def run_once() -> dict[str, Any]:
        pf = pfaffian_batched_4d(mats, method=method)
        return {"pf_sum": complex(np.sum(pf))}

    bytes_input = int(mats.nbytes)
    bytes_output = int(outer * inner * 16)
    meta = {
        "workload": "many_small",
        "outer": int(outer),
        "inner": int(inner),
        "n": int(n),
        "method": method,
        "dtype": "complex128",
        "bytes_input": bytes_input,
        "bytes_output": bytes_output,
    }
    return run_once, meta


def _print_result(res: BenchResult) -> None:
    s = _stats(res.seconds)
    print(f"\n== {res.name} ==")
    print(
        f"time: n={int(s['n'])} mean={s['mean']:.6f}s stdev={s['stdev']:.6f}s "
        f"min={s['min']:.6f}s max={s['max']:.6f}s"
    )
    print(f"bytes: input={_bytes(res.bytes_input)} output={_bytes(res.bytes_output)}")
    # Summarize rusage deltas (median per-iteration).
    if res.rusage_delta:
        keys = sorted(res.rusage_delta[0].keys())
        med = {
            k: int(statistics.median([d.get(k, 0) for d in res.rusage_delta]))
            for k in keys
        }
        print(
            "rusage (median delta/iter): "
            + ", ".join(
                [
                    f"{k}={_bytes(v) if k == 'ru_maxrss' else v}"
                    for k, v in med.items()
                    if v != 0
                ]
            )
        )


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__)
    sub = p.add_subparsers(dest="cmd", required=True)

    common = argparse.ArgumentParser(add_help=False)
    common.add_argument("--iters", type=int, default=5, help="Measured iterations")
    common.add_argument("--warmup", type=int, default=1, help="Warmup iterations")
    common.add_argument("--seed", type=int, default=0, help="RNG seed")
    common.add_argument("--method", choices=["P", "H"], default="P", help="PFAPACK method")
    common.add_argument(
        "--validate",
        action="store_true",
        help="Run small correctness checks before benchmarking",
    )
    common.add_argument(
        "--json-out",
        type=str,
        default=None,
        help="Optional path to write JSON results",
    )

    p_tomo = sub.add_parser("tomography", parents=[common], help="Tomography-style workload")
    p_tomo.add_argument("--nshadow", type=int, default=256)
    p_tomo.add_argument("--ngrid", type=int, default=17)
    p_tomo.add_argument("--n-sel", type=int, default=24, dest="n_sel")
    p_tomo.add_argument("--n-full", type=int, default=48, dest="n_full")

    p_small = sub.add_parser("many-small", parents=[common], help="Many small matrices workload")
    p_small.add_argument("--outer", type=int, default=4096)
    p_small.add_argument("--inner", type=int, default=5)
    p_small.add_argument("--n", type=int, default=8)

    p_all = sub.add_parser("all", parents=[common], help="Run both workloads")
    p_all.add_argument("--nshadow", type=int, default=256)
    p_all.add_argument("--ngrid", type=int, default=17)
    p_all.add_argument("--n-sel", type=int, default=24, dest="n_sel")
    p_all.add_argument("--n-full", type=int, default=48, dest="n_full")
    p_all.add_argument("--outer", type=int, default=4096)
    p_all.add_argument("--inner", type=int, default=5)
    p_all.add_argument("--n", type=int, default=8)

    args = p.parse_args(argv)

    print("PFAPACK Phase 2 Bench")
    print(json.dumps(system_info(), indent=2, sort_keys=True))

    results: dict[str, Any] = {
        "system": system_info(),
        "runs": [],
    }

    def run_one(name: str, fn: Callable[[], Any], meta: dict[str, Any]) -> None:
        print("\n-- config --")
        print(json.dumps(meta, indent=2, sort_keys=True))
        res = _run_repeated(
            name=name,
            fn=fn,
            iters=args.iters,
            warmup=args.warmup,
            bytes_input=meta["bytes_input"],
            bytes_output=meta["bytes_output"],
        )
        _print_result(res)
        results["runs"].append(
            {
                "meta": meta,
                "stats": _stats(res.seconds),
                "seconds": res.seconds,
                "rusage_delta": res.rusage_delta,
            }
        )

    if args.cmd in {"tomography", "all"}:
        if not HAS_TOMOGRAPHY_FUNCS:
            print("\nSkipping tomography: pfaffian_batched_4d_with_inverse not available")
        else:
            fn, meta = workload_tomography(
                nshadow=args.nshadow,
                ngrid=args.ngrid,
                n_sel=args.n_sel,
                n_full=args.n_full,
                seed=args.seed,
                method=args.method,
                validate=args.validate,
            )
            run_one("tomography", fn, meta)

    if args.cmd in {"many-small", "all"}:
        fn, meta = workload_many_small(
            outer=args.outer,
            inner=args.inner,
            n=args.n,
            seed=args.seed,
            method=args.method,
            validate=args.validate,
        )
        run_one("many_small", fn, meta)

    if args.json_out:
        out_path = Path(args.json_out)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(results, indent=2, sort_keys=True))
        print(f"\nwrote: {out_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

