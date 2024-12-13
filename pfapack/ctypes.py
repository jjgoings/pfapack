# PFAPACK wrapper of the C library.

import ctypes
import numpy as np
from numpy.ctypeslib import ndpointer
import importlib.resources as pkg_resources

try:
    # Accessing the resource in a way compatible with newer Python versions
    lib_resource = pkg_resources.files('pfapack').joinpath('libcpfapack.so')
    lib_path = lib_resource.resolve(strict=True)
    lib = ctypes.CDLL(str(lib_path))
except Exception as e:
    print(f"Error locating libcpfapack.so: {e}")
    raise

def _init(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int  # result type
    func.argtypes = [
        ctypes.c_int,
        ndpointer(ctypes.c_double, flags="F_CONTIGUOUS"),
        ctypes.POINTER(ctypes.c_double),
        ctypes.c_char_p,
        ctypes.c_char_p,
    ]
    return func

def _init_batched(which, is_complex=False):
    """Initialize a standard batched function."""
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    dtype = np.complex128 if is_complex else np.float64
    func.argtypes = [
        ctypes.c_int,                # batch_size
        ctypes.c_int,                # N
        ndpointer(dtype),            # A_batch
        ndpointer(dtype),            # PFAFF_batch
        ctypes.c_char_p,             # UPLO
        ctypes.c_char_p,             # MTHD
    ]
    return func

def _init_batched_4d(which, is_complex=False):
    """Initialize a batched 4D function without inverse."""
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    dtype = np.complex128 if is_complex else np.float64
    func.argtypes = [
        ctypes.c_int,                # outer_batch_size
        ctypes.c_int,                # inner_batch_size
        ctypes.c_int,                # N
        ndpointer(dtype),            # A_batch
        ndpointer(dtype),            # PFAFF_batch
        ctypes.c_char_p,             # UPLO
        ctypes.c_char_p,             # MTHD
    ]
    return func

def _init_batched_4d_with_inverse(which, is_complex=False):
    """Initialize a batched 4D with inverse function."""
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    dtype = np.complex128 if is_complex else np.float64
    func.argtypes = [
        ctypes.c_int,                # outer_batch_size
        ctypes.c_int,                # inner_batch_size
        ctypes.c_int,                # N
        ndpointer(dtype),            # A_batch
        ndpointer(dtype),            # pfaffians
        ndpointer(dtype),            # inverses
        ctypes.c_char_p,             # UPLO
        ctypes.c_char_p,             # MTHD
    ]
    return func

def _init_pfaffian_deriv(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    func.argtypes = [
        ctypes.c_int,                # n_sh
        ctypes.c_int,                # n_grid
        ndpointer(np.float64),       # weights
        ctypes.c_int,                # n_sel
        ndpointer(ctypes.c_int),     # selector
        ctypes.c_int,                # N
        ndpointer(np.complex128),    # db_mat
        ndpointer(np.complex128),    # matrices_c_inv
        ndpointer(np.complex128),    # pfaffian_deriv
    ]
    return func

def _init_pfaffian_deriv2(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    func.argtypes = [
        ctypes.c_int,                # n_sh
        ctypes.c_int,                # n_grid
        ndpointer(np.float64),       # weights
        ctypes.c_int,                # n_sel
        ndpointer(ctypes.c_int),     # selector
        ctypes.c_int,                # N
        ndpointer(np.complex128),    # db_mat
        ndpointer(np.complex128),    # matrices_c_inv
        ndpointer(np.complex128),    # pfaffian_deriv2
    ]
    return func

skpfa_d = _init("skpfa_d")  # Pfaffian for real double
skpf10_d = _init("skpf10_d")
skpfa_z = _init("skpfa_z")  # Pfaffian for complex double
skpf10_z = _init("skpf10_z")

functions = {
    "skpfa_batched_d": _init_batched("skpfa_batched_d"),
    "skpfa_batched_z": _init_batched("skpfa_batched_z", is_complex=True),
    "skpfa_batched_4d_d": _init_batched_4d("skpfa_batched_4d_d"),
    "skpfa_batched_4d_z": _init_batched_4d("skpfa_batched_4d_z", is_complex=True),
    "skpfa_batched_4d_d_with_inverse": _init_batched_4d_with_inverse("skpfa_batched_4d_d_with_inverse"),
    "skpfa_batched_4d_z_with_inverse": _init_batched_4d_with_inverse("skpfa_batched_4d_z_with_inverse", is_complex=True),
    "pfaffian_deriv_1": _init_pfaffian_deriv("pfader_1"),
    "pfaffian_deriv_2": _init_pfaffian_deriv2("pfader_2")
}

def from_exp(x, exp):
    """Convert pfapack overflow-safe representation (x, exponent) scalar number.

    Overflows are converted to infinities.
    """
    assert np.isclose(np.imag(exp), 0.0)
    try:
        return x * 10 ** exp
    except OverflowError:
        return x * np.inf


def pfaffian(
    matrix: np.ndarray,
    uplo: str = "U",
    method: str = "P",
    avoid_overflow: bool = False,
):
    """Compute Pfaffian.

    Parameters
    ----------
    matrix : numpy.ndarray
        Square skew-symmetric matrix.
    uplo : str
        If 'U' ('L'), the upper (lower) triangle of the matrix is used.
    method : str
        If 'P' ('H'), the Parley-Reid (Householder) algorithm is used.
    avoid_overflow : bool
        If True, take special care to avoid numerical under- or
        overflow (at the cost of possible additional round-off errors).
    """
    uplo: bytes = uplo.encode()
    method: bytes = method.encode()
    assert np.ndim(matrix) == 2 and np.shape(matrix)[0] == np.shape(matrix)[1]
    if np.iscomplex(matrix).any():
        a = np.zeros((2,) + np.shape(matrix), dtype=np.float64, order="F")
        a[0] = np.real(matrix)
        a[1] = np.imag(matrix)
        if avoid_overflow:
            pfaffian = (ctypes.c_double * 4)(0.0, 0.0)
            success = skpf10_z(matrix.shape[0], a, pfaffian, uplo, method)
            x = pfaffian[0] + 1j * pfaffian[1]
            exp = pfaffian[2] + 1j * pfaffian[3]
            pfaffian = from_exp(x, exp)
        else:
            pfaffian = (ctypes.c_double * 2)(0.0, 0.0)
            success = skpfa_z(matrix.shape[0], a, pfaffian, uplo, method)
            pfaffian = pfaffian[0] + 1j * pfaffian[1]
    else:
        matrix = np.asarray(matrix, dtype=np.float64, order="F")
        if avoid_overflow:
            pfaffian = (ctypes.c_double * 2)(0.0, 0.0)
            success = skpf10_d(matrix.shape[0], matrix, pfaffian, uplo, method)
            pfaffian = from_exp(pfaffian[0], pfaffian[1])
        else:
            pfaffian = ctypes.c_double(0.0)
            success = skpfa_d(
                matrix.shape[0], matrix, ctypes.byref(pfaffian), uplo, method
            )
            pfaffian = pfaffian.value
    assert success == 0
    return pfaffian

def pfaffian_batched(matrices, uplo="U", method="P"):
    """
    Compute the Pfaffian for a batch of skew-symmetric matrices with optimized memory handling.
    
    Parameters
    ----------
    matrices : numpy.ndarray
        3D array of shape (batch_size, N, N) containing skew-symmetric matrices
    uplo : str, optional
        'U' for upper triangle, 'L' for lower triangle
    method : str, optional
        'P' for Parlett-Reid, 'H' for Householder
        
    Returns
    -------
    numpy.ndarray
        1D array of Pfaffians for each matrix in the batch
    """
    # Input validation
    if matrices.ndim != 3:
        raise ValueError("Input must be a 3D array for batched operation")
    
    batch_size, N, M = matrices.shape
    if M != N:
        raise ValueError("Each matrix must be square (N x N)")

    # Determine type and prepare arrays efficiently
    if np.iscomplexobj(matrices):
        # Convert only if needed, avoid unnecessary copy
        if not matrices.dtype == np.complex128:
            matrices = np.asarray(matrices, dtype=np.complex128)
        PFAFF_batch = np.empty(batch_size, dtype=np.complex128)
        func = functions["skpfa_batched_z"]
    else:
        # Convert only if needed, avoid unnecessary copy
        if not matrices.dtype == np.float64:
            matrices = np.asarray(matrices, dtype=np.float64)
        PFAFF_batch = np.empty(batch_size, dtype=np.float64)
        func = functions["skpfa_batched_d"]
    
    # Ensure array is C-contiguous only if necessary
    if not matrices.flags['C_CONTIGUOUS']:
        matrices = np.ascontiguousarray(matrices)
    
    # Compute Pfaffians
    success = func(
        batch_size,
        N,
        matrices,
        PFAFF_batch,
        uplo.encode(),
        method.encode()
    )
    
    if success != 0:
        raise RuntimeError(f"Pfaffian computation failed with error code {success}")
    
    return PFAFF_batch

def pfaffian_batched_4d(matrices, uplo="U", method="P"):
    """
    Compute Pfaffians for a 4D batch of skew-symmetric matrices.
    
    Parameters
    ----------
    matrices : numpy.ndarray
        4D array of shape (outer_batch, inner_batch, N, N) containing skew-symmetric matrices
    uplo : str, optional
        'U' for upper triangle, 'L' for lower triangle
    method : str, optional
        'P' for Parlett-Reid, 'H' for Householder
        
    Returns
    -------
    numpy.ndarray
        2D array of shape (outer_batch, inner_batch) containing Pfaffians
    """
    if matrices.ndim != 4:
        raise ValueError("Input must be a 4D array")
    
    outer_batch_size, inner_batch_size, N, M = matrices.shape
    if M != N:
        raise ValueError("Last two dimensions must be square (N x N)")
        
    # Determine type and prepare arrays
    if np.iscomplexobj(matrices):
        # Convert only if needed
        if not matrices.dtype == np.complex128:
            matrices = np.asarray(matrices, dtype=np.complex128)
        result = np.empty((outer_batch_size, inner_batch_size), dtype=np.complex128)
        func = functions["skpfa_batched_4d_z"]
    else:
        # Convert only if needed
        if not matrices.dtype == np.float64:
            matrices = np.asarray(matrices, dtype=np.float64)
        result = np.empty((outer_batch_size, inner_batch_size), dtype=np.float64)
        func = functions["skpfa_batched_4d_d"]
    
    # Ensure array is C-contiguous
    if not matrices.flags['C_CONTIGUOUS']:
        matrices = np.ascontiguousarray(matrices)
    
    # Reshape to match C function's expectation
    matrices_flat = matrices.reshape(-1, N, N)
    result_flat = result.reshape(-1)
    
    # Compute Pfaffians
    success = func(
        outer_batch_size,
        inner_batch_size,
        N,
        matrices_flat,
        result_flat,
        uplo.encode(),
        method.encode()
    )
    
    if success != 0:
        raise RuntimeError(f"Pfaffian computation failed with error code {success}")
    
    return result

def pfaffian_batched_4d_with_inverse(matrices, *, uplo="U", method="P", inplace=False):
    """
    Compute Pfaffians and inverses for a batch of real or complex matrices.

    Parameters
    ----------
    matrices : numpy.ndarray
        4D array of shape (outer_batch, inner_batch, N, N) containing skew-symmetric matrices
    uplo : str, optional
        'U' for upper triangle, 'L' for lower triangle
    method : str, optional
        'P' for Parlett-Reid, 'H' for Householder
    inplace : bool, optional
        If True, modify input matrices in place for inverses

    Returns
    -------
    tuple
        (pfaffians, inverses) where:
        - pfaffians: shape (outer_batch, inner_batch) containing Pfaffians
        - inverses: shape (outer_batch, inner_batch, N, N) containing matrix inverses
    """
    if matrices.ndim != 4:
        raise ValueError("Input must be a 4D array")

    outer_batch_size, inner_batch_size, N, M = matrices.shape
    if M != N:
        raise ValueError("Last two dimensions must be square (N x N)")

    # Determine type and prepare arrays
    if np.iscomplexobj(matrices):
        # Convert to complex128 if needed
        if matrices.dtype != np.complex128:
            matrices = matrices.astype(np.complex128)
        dtype = np.complex128
        func = functions["skpfa_batched_4d_z_with_inverse"]
    else:
        # Convert to float64 if needed
        if matrices.dtype != np.float64:
            matrices = matrices.astype(np.float64)
        dtype = np.float64
        func = functions["skpfa_batched_4d_d_with_inverse"]

    # Ensure C-contiguous
    if not matrices.flags['C_CONTIGUOUS']:
        matrices = np.ascontiguousarray(matrices)

    # Prepare output arrays
    pfaffians = np.empty((outer_batch_size, inner_batch_size), dtype=dtype)
    if inplace:
        inverses = matrices
    else:
        inverses = np.empty_like(matrices)

    # Call C function
    success = func(
        outer_batch_size,
        inner_batch_size,
        N,
        matrices,
        pfaffians,
        inverses,
        uplo.encode(),
        method.encode()
    )

    if success != 0:
        raise RuntimeError(f"PFAPACK returned error code {success}")

    return pfaffians, inverses

def pfaffian_deriv_1(matrices_c_inv, db_mat, s, zs, pfaffian_deriv):
    num_shadow, num_grid_points, n_sel, _ = matrices_c_inv.shape
    _, n_q, _ = db_mat.shape
    assert db_mat.shape == (num_shadow, n_q, n_q)
    assert matrices_c_inv.shape == (num_shadow, num_grid_points, n_sel, n_sel)
    assert len(s) == n_sel
    assert len(zs) == num_grid_points
    assert pfaffian_deriv.shape == (num_shadow, num_grid_points)

    zarray = np.array(zs)
    selector = np.array(s, dtype=np.int32)
    func = functions["pfaffian_deriv_1"]

    # Call C function
    success = func(
        num_shadow,
        num_grid_points,
        zarray,
        n_sel,
        selector,
        n_q,
        db_mat,
        matrices_c_inv,
        pfaffian_deriv
    )

    if success != 0:
        raise RuntimeError(f"PFAPACK returned error code {success}")

    return pfaffian_deriv

def pfaffian_deriv_2(matrices_c_inv, db_mat, s, zs, pfaffian_deriv2):
    num_shadow, num_grid_points, n_sel, _ = matrices_c_inv.shape
    _, n_q, _ = db_mat.shape
    assert db_mat.shape == (num_shadow, n_q, n_q)
    assert matrices_c_inv.shape == (num_shadow, num_grid_points, n_sel, n_sel)
    assert len(s) == n_sel
    assert len(zs) == num_grid_points
    assert pfaffian_deriv2.shape == (num_shadow, num_grid_points)

    zarray = np.array(zs)
    selector = np.array(s, dtype=np.int32)
    func = functions["pfaffian_deriv_2"]

    # Call C function
    success = func(
        num_shadow,
        num_grid_points,
        zarray,
        n_sel,
        selector,
        n_q,
        db_mat,
        matrices_c_inv,
        pfaffian_deriv2
    )

    if success != 0:
        raise RuntimeError(f"PFAPACK returned error code {success}")

    return pfaffian_deriv2
