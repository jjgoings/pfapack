"""
Example: Computing Pfaffians for a batch of complex skew-symmetric matrices.
Demonstrates efficient batch processing using pfapack's C-accelerated implementation.
"""

import numpy as np
from pfapack.ctypes import pfaffian_batched
from typing import Optional, Tuple

def compute_batched_pfaffians(
    inner_batch: int,
    N: int,
    seed: Optional[int] = None
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Compute Pfaffians for a batch of random skew-symmetric complex matrices.
    
    Parameters
    ----------
    inner_batch : int
        Number of matrices in the batch
    N : int
        Matrix dimension (must be even)
    seed : int, optional
        Random seed for reproducibility
        
    Returns
    -------
    np.ndarray
        Array of computed Pfaffian values, shape (inner_batch,)
    np.ndarray
        The batch of input matrices, shape (inner_batch, N, N)
        
    Raises
    ------
    ValueError
        If N is not even
    
    Examples
    --------
    >>> pfs, matrices = compute_batched_pfaffians(inner_batch=10, N=4, seed=42)
    >>> print(f"Pfaffians shape: {pfs.shape}")
    >>> print(f"Matrices shape: {matrices.shape}")
    """
    if N % 2 != 0:
        raise ValueError("Matrix dimension N must be even")
        
    if seed is not None:
        np.random.seed(seed)
        
    # Create batch of random complex matrices
    A = np.random.randn(inner_batch, N, N) + 1j * np.random.randn(inner_batch, N, N)
    # Make each matrix skew-symmetric
    A = A - np.transpose(A, (0, 2, 1))
    
    # Compute batched Pfaffians
    pfs = pfaffian_batched(A)
    
    return pfs, A

if __name__ == "__main__":
    # Example usage
    inner_batch = 10
    N = 8
    
    pfs, matrices = compute_batched_pfaffians(inner_batch, N, seed=42)
    
    print(f"Computed {inner_batch} Pfaffians for {N}x{N} matrices")
    print(f"First few Pfaffian values: {pfs[:3]}")
    print(f"Matrices shape: {matrices.shape}")
    
    print("\nVerification for first matrix:")
    print(f"Matrix is skew-symmetric: {np.allclose(matrices[0], -matrices[0].T)}")
    print(f"pf^2 ≈ det(A): {np.allclose(pfs[0]**2, np.linalg.det(matrices[0]), rtol=1e-10)}")
