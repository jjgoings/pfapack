"""
Comprehensive performance benchmarking for Pfaffian computations.
Compares different implementation strategies and batch processing approaches
for complex skew-symmetric matrices.
"""

import time
import numpy as np
import matplotlib.pyplot as plt
from typing import Dict, List, Tuple, Optional, Callable
from pfapack import pfaffian as pfa
from pfapack.ctypes import (
    pfaffian as cpfaffian,
    pfaffian_batched as cpfaffian_batched,
    pfaffian_batched_4d as cpfaffian_batched_4d
)

def create_test_matrices(
    outer_batch: int,
    inner_batch: int,
    N: int,
    seed: Optional[int] = None
) -> np.ndarray:
    """
    Create random skew-symmetric test matrices.
    
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
    np.ndarray
        Complex-valued skew-symmetric matrices of shape (outer_batch, inner_batch, N, N)
    
    Notes
    -----
    Generates complex matrices with random real and imaginary parts, then
    ensures skew-symmetry by appropriate transposition.
    """
    if seed is not None:
        np.random.seed(seed)
    A = np.random.randn(outer_batch, inner_batch, N, N) + \
        1j * np.random.randn(outer_batch, inner_batch, N, N)
    return A - np.transpose(A, (0, 1, 3, 2))

def measure_performance(
    outer_batch: int,
    N: int,
    num_iterations: int = 5
) -> Tuple[List[float], int]:
    """
    Measure performance of different Pfaffian computation methods.
    
    Parameters
    ----------
    outer_batch : int
        Size of outer batch dimension
    N : int
        Matrix dimension
    num_iterations : int, optional
        Number of iterations for timing
        
    Returns
    -------
    List[float]
        Average execution times for each method
    int
        Total number of matrices processed
    """
    inner_batch = N + 1  # Traditional choice for inner batch size
    total_matrices = outer_batch * inner_batch
    
    times = [[] for _ in range(4)]  # One list for each method
    results = [None] * 4  # To store results for validation

    for _ in range(num_iterations):
        A = create_test_matrices(outer_batch, inner_batch, N)

        # 1. Fully looped (Python implementation)
        start_time = time.time()
        results[0] = [[pfa.pfaffian(a) for a in batch] for batch in A]
        times[0].append(time.time() - start_time)

        # 2. Fully looped (C implementation)
        start_time = time.time()
        results[1] = [[cpfaffian(a) for a in batch] for batch in A]
        times[1].append(time.time() - start_time)

        # 3. Partially batched (3D, loop over outer batch)
        start_time = time.time()
        results[2] = [cpfaffian_batched(batch) for batch in A]
        times[2].append(time.time() - start_time)

        # 4. Fully batched (4D)
        start_time = time.time()
        results[3] = cpfaffian_batched_4d(A)
        times[3].append(time.time() - start_time)

        # Validate results match across implementations
        for i in range(1, 4):
            np.testing.assert_allclose(
                np.array(results[0]),
                np.array(results[i]),
                atol=1e-11,
                err_msg=f"Results mismatch in method {i}"
            )

    # Calculate average times
    avg_times = [np.mean(method_times) for method_times in times]
    return avg_times, total_matrices

def main():
    """Execute comprehensive benchmark suite."""
    # Configuration
    np.random.seed(0)
    N = 8  # Matrix size
    outer_batch_sizes = [1, 5, 10, 50, 100, 500, 1000]
    methods = ['Python (looped)', 'C (looped)', 'C (batched 3D)', 'C (batched 4D)']

    # Measure performance
    results = [measure_performance(count, N) for count in outer_batch_sizes]
    times, total_matrices = zip(*results)

    # Plot results
    plt.figure(figsize=(4.75, 3.25))
    for i, method in enumerate(methods):
        method_times = [result[i] for result in times]
        plt.loglog(total_matrices, method_times, marker='o', label=method)

    plt.xlabel('Total number of matrices')
    plt.ylabel('Average time (seconds)')
    plt.title(f'Pfaffian Calculation Performance ({N}x{N})')
    plt.legend(fontsize='x-small')
    plt.grid(True, which="both", ls="-", alpha=0.2)
    plt.tight_layout()
    plt.savefig('pfaffian_performance.png', dpi=600, bbox_inches='tight')
    plt.close()

    # Print final statistics
    print(f"Performance for {total_matrices[-1]} matrices:")
    print(f"Structure: {outer_batch_sizes[-1]} outer batch × {N+1} inner batch")
    print(f"Each matrix: {N}x{N} (complex-valued)")
    print("\n{:<20} {:>15} {:>15}".format("Method", "Time (µs)", "Speedup"))
    print("-" * 53)

    python_time = times[-1][0]
    for method, time in zip(methods, times[-1]):
        speedup = python_time / time
        print("{:<20} {:>15.2f} {:>15.2f}x".format(
            method, time*1e6, speedup
        ))

if __name__ == "__main__":
    main()
