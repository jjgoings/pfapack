"""
Compare performance between Pfaffian and determinant computations.
Demonstrates relative performance across different batch processing approaches.
"""

import numpy as np
import time
from typing import Dict, Optional, Tuple
from pfapack.ctypes import pfaffian as cpfaffian
from pfapack.ctypes import pfaffian_batched as cpfaffian_batched
from pfapack.ctypes import pfaffian_batched_4d as cpfaffian_batched_4d

def compare_performance(
    outer_batch: int,
    inner_batch: int,
    N: int,
    seed: Optional[int] = None
) -> Dict[str, float]:
    """
    Compare performance between Pfaffian and determinant computations.
    
    Parameters
    ----------
    outer_batch : int
        Size of outer batch dimension
    inner_batch : int
        Size of inner batch dimension
    N : int
        Matrix dimension (must be even)
    seed : int, optional
        Random seed for reproducibility
        
    Returns
    -------
    Dict[str, float]
        Execution times for each computation method
    """
    if seed is not None:
        np.random.seed(seed)
        
    # Create test matrices
    A = np.random.randn(outer_batch, inner_batch, N, N) + \
        1j * np.random.randn(outer_batch, inner_batch, N, N)
    A = A - np.transpose(A, (0, 1, 3, 2))
    
    results = {}
    
    # Pfaffian computations
    start = time.perf_counter()
    pf_looped = [[cpfaffian(a) for a in batch] for batch in A]
    results['pfaffian_looped'] = time.perf_counter() - start
    
    start = time.perf_counter()
    pf_batched = [cpfaffian_batched(batch) for batch in A]
    results['pfaffian_batched'] = time.perf_counter() - start
    
    start = time.perf_counter()
    pf_4d = cpfaffian_batched_4d(A)
    results['pfaffian_4d'] = time.perf_counter() - start
    
    # Determinant computations
    start = time.perf_counter()
    det_looped = [[np.linalg.det(a) for a in batch] for batch in A]
    results['determinant_looped'] = time.perf_counter() - start
    
    start = time.perf_counter()
    det_batched = [np.linalg.det(batch) for batch in A]
    results['determinant_batched'] = time.perf_counter() - start
    
    # Validate Pfaffian^2 = determinant
    np.testing.assert_allclose(
        np.array(pf_looped)**2,
        np.array(det_looped),
        rtol=1e-10,
        err_msg="Pfaffian^2 != determinant"
    )
    
    return results

if __name__ == "__main__":
    # Configuration
    outer_batch = 5
    inner_batch = 10
    N = 8
    
    times = compare_performance(outer_batch, inner_batch, N, seed=42)
    
    print(f"Performance comparison ({outer_batch}×{inner_batch} matrices, {N}×{N}):")
    print("\n{:<20} {:>15}".format("Method", "Time (µs)"))
    print("-" * 36)
    
    for method, time_taken in times.items():
        print("{:<20} {:>15.2f}".format(method, time_taken*1e6))
