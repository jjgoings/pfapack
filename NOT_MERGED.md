# Why This Branch Was Not Merged

**Branch:** `fused-swap-negate`
**Date:** January 2026
**Decision:** Do not merge

## What It Does

Fuses the three-call pivot interchange idiom:
```
swap → negate column segment → scale row segment by -1
```
into a single `ZSWAPNEG_MIX` / `DSWAPNEG_MIX` kernel that performs the swap-and-negate in one memory pass instead of three.

## Why It Wasn't Merged

The middle-band work being fused is O(M) per pivot, while the rank-2 update is O(K²) per step. The fraction of time attributable to "pivot bookkeeping" falls like 1/K as soon as K > ~12.

**Benchmark results at AFQMC-relevant sizes (n ∈ [16, 64]):**
- ±3% swings, including small regressions at n=16 complex
- Statistically indistinguishable from noise
- Sometimes the wrong sign

This is consistent with optimizing a cold-ish path where second-order effects (instruction cache layout, call-site inlining, BLAS quirks) dominate.

## Trade-off Analysis

**Costs:**
- Adds bespoke mixed-stride kernels in both real and complex paths
- Nonstandard pattern (vs familiar LAPACK-style BLAS composition)
- Future contributors must re-derive the transform mentally
- Takes ownership of corner-case behavior across compilers/platforms

**Benefits:**
- Algebraically correct
- Reduces memory passes (3 → 1)
- Locally elegant

**Verdict:** "Performance-neutral but more code" is a net loss in a numerics library unless deleting complexity elsewhere.

## If You Want to Move the Needle

The only remaining lever that changes the Amdahl ceiling (rather than shaving the remainder) is **semantics**: an in-place batched entry point that deletes the copy, or size-specialized copy paths for fixed n. Everything else is fighting over O(K) terms in code dominated by O(K²) updates and compulsory data motion.
