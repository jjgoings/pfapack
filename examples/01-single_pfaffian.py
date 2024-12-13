"""
Example: Computing Pfaffian for a single complex skew-symmetric matrix.
Demonstrates basic usage of pfapack's C-accelerated Pfaffian computation.
"""

import numpy as np
from pfapack.ctypes import pfaffian as cpfaffian
from typing import Optional, Tuple

def compute_single_pfaffian(
    N: int, 
    seed: Optional[int] = None
) -> Tuple[complex, np.ndarray]:
    """
    Compute Pfaffian of a single random skew-symmetric complex matrix.
    
    Parameters
    ----------
    N : int
        Matrix dimension (must be even)
    seed : int, optional
        Random seed for reproducibility
        
    Returns
    -------
    complex
        Computed Pfaffian value
    np.ndarray
        The input matrix used, shape (N, N)
    
    Raises
    ------
    ValueError
        If N is not even
    
    Examples
    --------
    >>> pf, A = compute_single_pfaffian(4, seed=42)
    >>> print(f"Pfaffian value: {pf}")
    >>> print(f"Input matrix shape: {A.shape}")
    """
    if N % 2 != 0:
        raise ValueError("Matrix dimension N must be even")
        
    if seed is not None:
        np.random.seed(seed)
        
    # Create random complex matrix
    A = np.random.randn(N, N) + 1j * np.random.randn(N, N)
    # Make it skew-symmetric
    A = A - A.T
    
    # Compute Pfaffian
    pf = cpfaffian(A)
    
    return pf, A

if __name__ == "__main__":
    # Example usage
    N = 8
    pf, A = compute_single_pfaffian(N, seed=42)
    
    print(f"Matrix dimension: {N}x{N}")
    print(f"Pfaffian value: {pf}")
    print("\nVerification:")
    print(f"Matrix is skew-symmetric: {np.allclose(A, -A.T)}")
    print(f"pf^2 ≈ det(A): {np.allclose(pf**2, np.linalg.det(A), rtol=1e-10)}")
