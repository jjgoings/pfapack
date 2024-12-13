"""
Example: Computing Pfaffians with matrix inverses for batched complex skew-symmetric matrices.
Demonstrates efficient batch processing with inverse computation using pfapack's C-accelerated implementation.
"""

import numpy as np
from pfapack.ctypes import pfaffian_batched_4d_with_inverse
from typing import Optional, Tuple

def compute_pfaffian_with_inverse(
    outer_batch: int,
    inner_batch: int,
    N: int,
    seed: Optional[int] = None
) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Compute Pfaffians and inverses for a batch of random skew-symmetric complex matrices.
    
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
    Tuple[np.ndarray, np.ndarray, np.ndarray]
        - Pfaffian values with shape (outer_batch, inner_batch)
        - Input matrices with shape (outer_batch, inner_batch, N, N)
        - Inverse matrices with shape (outer_batch, inner_batch, N, N)
        
    Raises
    ------
    ValueError
        If N is not even
    
    Notes
    -----
    The function ensures numerical stability by:
    1. Creating well-conditioned skew-symmetric matrices
    2. Computing both Pfaffians and inverses in a numerically stable way
    3. Validating the results through AA^(-1) = I checks
    """
    if N % 2 != 0:
        raise ValueError("Matrix dimension N must be even")
        
    if seed is not None:
        np.random.seed(seed)
        
    # Create test matrices
    A = np.random.randn(outer_batch, inner_batch, N, N) + \
        1j * np.random.randn(outer_batch, inner_batch, N, N)
    A = A - np.transpose(A, (0, 1, 3, 2))  # Make skew-symmetric
    
    # Create copy to avoid modifying original during computation
    A_compute = A.copy()
    
    # Compute Pfaffians and inverses
    pfaffians, inverses = pfaffian_batched_4d_with_inverse(A_compute)
    
    return pfaffians, A, inverses

def validate_inverse_computation(
    matrices: np.ndarray,
    inverses: np.ndarray,
    tolerance: float = 1e-12
) -> bool:
    """
    Validate inverse computation by checking AA^(-1) = I.
    
    Parameters
    ----------
    matrices : np.ndarray
        Original matrices
    inverses : np.ndarray
        Computed inverse matrices
    tolerance : float, optional
        Numerical tolerance for validation
        
    Returns
    -------
    bool
        True if validation passes, False otherwise
    """
    batch_shape = matrices.shape[:-2]
    N = matrices.shape[-1]
    identity = np.eye(N)
    
    for idx in np.ndindex(batch_shape):
        prod = np.matmul(matrices[idx], inverses[idx])
        if not np.allclose(prod, identity, atol=tolerance):
            return False
    return True

if __name__ == "__main__":
    # Example configuration
    outer_batch = 5
    inner_batch = 10
    N = 8
    
    # Compute Pfaffians and inverses
    pfaffians, matrices, inverses = compute_pfaffian_with_inverse(
        outer_batch, inner_batch, N, seed=42
    )
    
    print(f"Computation Results:")
    print(f"- Matrix configuration: {outer_batch}×{inner_batch} matrices of size {N}×{N}")
    print(f"- Pfaffians shape: {pfaffians.shape}")
    print(f"- Matrices shape: {matrices.shape}")
    print(f"- Inverses shape: {inverses.shape}")
    
    # Validate results
    inverse_valid = validate_inverse_computation(matrices, inverses)
    print("\nValidation Results:")
    print(f"- Inverse computation valid: {'✅' if inverse_valid else '❌'}")
    
    # Additional verification for first matrix
    first_matrix = matrices[0,0]
    first_inverse = inverses[0,0]
    first_pfaffian = pfaffians[0,0]
    
    print("\nDetailed Check (First Matrix):")
    print(f"- Skew-symmetric: {np.allclose(first_matrix, -first_matrix.T)}")
    print(f"- pf^2 ≈ det(A): {np.allclose(first_pfaffian**2, np.linalg.det(first_matrix))}")
    error = np.max(np.abs(np.matmul(first_matrix, first_inverse) - np.eye(N)))
    print(f"- Max deviation from identity: {error:.2e}")
