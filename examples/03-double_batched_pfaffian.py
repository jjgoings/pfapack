"""
Example: Computing Pfaffians for a double-batched array of complex skew-symmetric matrices.
Demonstrates highly efficient batch processing using pfapack's C-accelerated implementation
for matrices organized in a two-level batch structure.
"""

import numpy as np
from pfapack.ctypes import pfaffian_batched_4d
from typing import Optional, Tuple

def compute_double_batched_pfaffians(
    outer_batch: int,
    inner_batch: int,
    N: int,
    seed: Optional[int] = None
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Compute Pfaffians for a double-batched array of random skew-symmetric complex matrices.
    
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
        Array of computed Pfaffian values, shape (outer_batch, inner_batch)
    np.ndarray
        The input matrices, shape (outer_batch, inner_batch, N, N)
        
    Raises
    ------
    ValueError
        If N is not even
    
    Examples
    --------
    >>> pfs, matrices = compute_double_batched_pfaffians(
    ...     outer_batch=5, inner_batch=10, N=4, seed=42
    ... )
    >>> print(f"Pfaffians shape: {pfs.shape}")
    >>> print(f"Matrices shape: {matrices.shape}")
    """
    if N % 2 != 0:
        raise ValueError("Matrix dimension N must be even")
        
    if seed is not None:
        np.random.seed(seed)
        
    # Create double-batched array of random complex matrices
    A = np.random.randn(outer_batch, inner_batch, N, N) + \
        1j * np.random.randn(outer_batch, inner_batch, N, N)
    # Make each matrix skew-symmetric
    A = A - np.transpose(A, (0, 1, 3, 2))
    
    # Compute double-batched Pfaffians
    pfs = pfaffian_batched_4d(A)
    
    return pfs, A

if __name__ == "__main__":
    # Example usage
    outer_batch = 5
    inner_batch = 10
    N = 8
    
    pfs, matrices = compute_double_batched_pfaffians(outer_batch, inner_batch, N, seed=42)
    
    print(f"Matrix configuration:")
    print(f"- Outer batch size: {outer_batch}")
    print(f"- Inner batch size: {inner_batch}")
    print(f"- Matrix dimension: {N}x{N}")
    print(f"- Total matrices: {outer_batch * inner_batch}")
    print(f"\nOutput shapes:")
    print(f"- Pfaffians: {pfs.shape}")
    print(f"- Matrices: {matrices.shape}")
    
    print("\nVerification for first matrix:")
    print(f"Matrix is skew-symmetric: {np.allclose(matrices[0,0], -matrices[0,0].T)}")
    print(f"pf^2 ≈ det(A): {np.allclose(pfs[0,0]**2, np.linalg.det(matrices[0,0]), rtol=1e-10)}")
