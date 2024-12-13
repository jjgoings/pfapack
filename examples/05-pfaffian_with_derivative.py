"""
Example: Computing derivatives of Pfaffians for complex skew-symmetric matrices.
Demonstrates derivative computation using pfapack's specialized implementation.
"""

import numpy as np
from pfapack.ctypes import pfaffian_deriv_1
from typing import Optional, Tuple, List

def compute_pfaffian_derivative(
    N: int,
    n_selected: int,
    num_samples: int,
    num_points: int,
    seed: Optional[int] = None
) -> Tuple[np.ndarray, dict]:
    """
    Compute Pfaffian derivatives for complex skew-symmetric matrices.
    
    Parameters
    ----------
    N : int
        Full matrix dimension
    n_selected : int
        Number of selected indices for derivative computation
    num_samples : int
        Number of sample matrices
    num_points : int
        Number of grid points for derivative evaluation
    seed : Optional[int]
        Random seed for reproducibility
        
    Returns
    -------
    np.ndarray
        Computed derivative values with shape (num_samples, num_points)
    dict
        Configuration and intermediate values used in computation
        
    Notes
    -----
    The derivative computation follows these steps:
    1. Select subset of matrix indices
    2. Compute inverse correlation matrices
    3. Generate skew-symmetric derivative matrices
    4. Evaluate on specified grid points
    """
    if seed is not None:
        np.random.seed(seed)
        
    # Create selector for matrix indices
    selector = np.linspace(0, N-1, n_selected, dtype=int)
    
    # Generate inverse correlation matrices
    C_inv = np.random.randn(num_samples, num_points, n_selected, n_selected) + \
            1j * np.random.randn(num_samples, num_points, n_selected, n_selected)
    C_inv = np.ascontiguousarray(C_inv, dtype=np.complex128)
    
    # Generate derivative matrices (skew-symmetric)
    dB = np.random.randn(num_samples, N, N) + 1j * np.random.randn(num_samples, N, N)
    dB = dB - dB.transpose((0, 2, 1))
    dB = np.ascontiguousarray(dB, dtype=np.complex128)
    
    # Generate grid points
    z = np.random.randn(num_points)
    z = np.ascontiguousarray(z, dtype=np.float64)
    
    # Allocate output array
    derivatives = np.empty((num_samples, num_points), dtype=np.complex128)
    
    # Compute derivatives
    pfaffian_deriv_1(C_inv, dB, selector, z, derivatives)
    
    # Package configuration and intermediate values
    config = {
        'selector': selector,
        'C_inv': C_inv,
        'dB': dB,
        'z': z
    }
    
    return derivatives, config

def validate_derivative(
    derivatives: np.ndarray,
    config: dict,
    tolerance: float = 1e-11
) -> bool:
    """
    Validate Pfaffian derivative computation through reference implementation.
    
    Parameters
    ----------
    derivatives : np.ndarray
        Computed derivatives
    config : dict
        Configuration and matrices used in computation
    tolerance : float
        Numerical tolerance for validation
        
    Returns
    -------
    bool
        True if validation passes, False otherwise
    """
    num_samples, num_points = derivatives.shape
    n_selected = len(config['selector'])
    
    # Reference implementation
    ref_derivatives = np.empty_like(derivatives)
    
    for i in range(num_samples):
        for j in range(num_points):
            dbc = 0j
            for k in range(n_selected):
                s_k = config['selector'][k]
                for l in range(n_selected):
                    s_l = config['selector'][l]
                    dbc += config['dB'][i, s_k, s_l] * config['C_inv'][i, j, l, k]
            ref_derivatives[i, j] = config['z'][j] * dbc
    
    return np.allclose(derivatives, ref_derivatives, atol=tolerance)

if __name__ == "__main__":
    # Example configuration
    N = 8  # Matrix dimension
    n_selected = 4  # Number of selected indices
    num_samples = 10  # Number of samples
    num_points = 5  # Number of grid points
    
    # Compute derivatives
    derivatives, config = compute_pfaffian_derivative(
        N, n_selected, num_samples, num_points, seed=42
    )
    
    print(f"Computation Results:")
    print(f"- Matrix dimension: {N}×{N}")
    print(f"- Selected indices: {n_selected}")
    print(f"- Number of samples: {num_samples}")
    print(f"- Number of grid points: {num_points}")
    print(f"- Derivative shape: {derivatives.shape}")
    
    # Validate results
    valid = validate_derivative(derivatives, config)
    print("\nValidation Results:")
    print(f"- Derivative computation valid: {'✅' if valid else '❌'}")
    
    # Special case tests
    print("\nSpecial Case Tests:")
    # Test with zero derivative matrix
    config['dB'][:] = 0
    zero_derivatives = np.empty_like(derivatives)
    pfaffian_deriv_1(config['C_inv'], config['dB'], config['selector'], 
                     config['z'], zero_derivatives)
    print(f"- Zero matrix test: {'✅' if np.allclose(zero_derivatives, 0) else '❌'}")
    
    # Test with zero grid points
    config['z'][:] = 0
    zero_grid_derivatives = np.empty_like(derivatives)
    pfaffian_deriv_1(config['C_inv'], config['dB'], config['selector'], 
                     config['z'], zero_grid_derivatives)
    print(f"- Zero grid test: {'✅' if np.allclose(zero_grid_derivatives, 0) else '❌'}")
