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
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    if not is_complex:
        func.argtypes = [
            ctypes.c_int,                                  # batch_size
            ctypes.c_int,                                  # N
            ndpointer(np.float64),                        # A_batch - removed F_CONTIGUOUS requirement
            ndpointer(np.float64),                        # PFAFF_batch
            ctypes.c_char_p,                              # UPLO
            ctypes.c_char_p,                              # MTHD
        ]
    else:
        func.argtypes = [
            ctypes.c_int,                                  # batch_size
            ctypes.c_int,                                  # N
            ndpointer(np.complex128),                     # A_batch - removed F_CONTIGUOUS requirement
            ndpointer(np.complex128),                     # PFAFF_batch
            ctypes.c_char_p,                              # UPLO
            ctypes.c_char_p,                              # MTHD
        ]
    return func

def _init_batched_4d(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    func.argtypes = [
        ctypes.c_int,                          # outer_batch_size
        ctypes.c_int,                          # inner_batch_size
        ctypes.c_int,                          # N
        ndpointer(np.float64),                 # A_batch 
        ndpointer(np.float64),                 # PFAFF_batch
        ctypes.c_char_p,                       # UPLO
        ctypes.c_char_p,                       # MTHD
    ]
    return func

def _init_batched_4d_z(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    func.argtypes = [
        ctypes.c_int,                          # outer_batch_size
        ctypes.c_int,                          # inner_batch_size 
        ctypes.c_int,                          # N
        ndpointer(np.complex128),              # A_batch
        ndpointer(np.complex128),              # PFAFF_batch
        ctypes.c_char_p,                       # UPLO
        ctypes.c_char_p,                       # MTHD
    ]
    return func

def _init_batched_4d_z_with_inverse(which):
    func = getattr(lib, which)
    func.restype = ctypes.c_int
    func.argtypes = [
        ctypes.c_int,  # outer_batch_size
        ctypes.c_int,  # inner_batch_size
        ctypes.c_int,  # N
        ndpointer(ctypes.c_double, flags="C_CONTIGUOUS"),  # matrices: (S,G,2,N,N)
        ndpointer(ctypes.c_double, flags="C_CONTIGUOUS"),  # pfaffians_real_imag: (S,G,2)
        ndpointer(ctypes.c_double, flags="C_CONTIGUOUS"),  # inverses: (S,G,2,N,N)
        ctypes.c_char_p,
        ctypes.c_char_p,
    ]
    return func

skpfa_d = _init("skpfa_d")  # Pfaffian for real double
skpf10_d = _init("skpf10_d")
skpfa_z = _init("skpfa_z")  # Pfaffian for complex double
skpf10_z = _init("skpf10_z")

functions = {
    "skpfa_batched_d": _init_batched("skpfa_batched_d", is_complex=False),
    "skpfa_batched_z": _init_batched("skpfa_batched_z", is_complex=True),
    "skpfa_batched_4d_d": _init_batched_4d("skpfa_batched_4d_d"),
    "skpfa_batched_4d_z": _init_batched_4d_z("skpfa_batched_4d_z"),
    "skpfa_batched_4d_z_with_inverse": _init_batched_4d_z_with_inverse("skpfa_batched_4d_z_with_inverse")
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

def pfaffian_batched_4d_cx_with_inverse(matrices, *, uplo="U", method="P", inplace=False):
    """
    Compute Pfaffians and inverses for a batch of complex matrices using optimized memory layout.

    Args:
        matrices: Array of shape (outer_batch, inner_batch, 2, N, N), dtype=np.float64
                 where matrices[:,:,0,:,:] contains real parts and
                 matrices[:,:,1,:,:] contains imaginary parts
        uplo: Whether to use upper ('U') or lower ('L') triangular part
        method: Method to use ('P' for Parlett-Reid or 'H' for Householder)
        inplace: If True, compute inverses by overwriting the input matrices.
                If False, create a new array for inverses.

    Returns:
        tuple: (pfaffians, inverses) where:
               - pfaffians: shape (outer_batch, inner_batch) containing complex Pfaffians
               - inverses: shape (outer_batch, inner_batch, 2, N, N) containing matrix inverses
                          in the same format as input (real/imag split)
    """
    uplo = uplo.encode()
    method = method.encode()

    if matrices.ndim != 5:
        raise ValueError("Input must be 5D for batched operation.")

    outer_batch_size, inner_batch_size, ncx, N, M = matrices.shape
    if ncx != 2:
        raise ValueError("Unexpected layout of the input matrix.")
    if M != N:
        raise ValueError("Last two dimensions of each matrix must be square.")

    # Prepare output arrays
    pfaffians = np.empty((outer_batch_size, inner_batch_size), dtype=np.complex128)
    pfaffians_c = np.empty((outer_batch_size, inner_batch_size, 2), dtype=np.float64)

    if inplace:
        inverses = matrices
    else:
        inverses = np.empty_like(matrices)

    success = functions["skpfa_batched_4d_z_with_inverse"](
        outer_batch_size,
        inner_batch_size,
        N,
        matrices,
        pfaffians_c,
        inverses,
        uplo,
        method
    )

    if success != 0:
        raise RuntimeError(f"PFAPACK returned error code {success}")

    # Convert real/imag components to complex
    pfaffians = pfaffians_c[:, :, 0] + 1j * pfaffians_c[:, :, 1]

    return pfaffians, inverses
