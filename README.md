# PFAPACK with Batched Pfaffian Computation
[![Build and Test](https://github.com/jjgoings/pfapack/actions/workflows/main.yml/badge.svg)](https://github.com/jjgoings/pfapack/actions/workflows/main.yml)

This fork of PFAPACK adds efficient batched computation capabilities for Pfaffians, including optional computation of matrix inverses and derivatives.

The main reason for this fork was to eliminate needing to compute Pfaffians in Python loops 🙄

## Quick Install

```bash
pip install -e .  # for development install
# or
pip install .     # for regular install
```

Required libraries:
- BLAS
- LAPACK 
- A Fortran compiler (gfortran was tested)
- A C compiler
- Python 3.9+
- NumPy
- SciPy
- Cython

## Key Features Added in this Fork

- Batched Pfaffian computation for 3D arrays (multiple matrices)
- Batched Pfaffian computation for 4D arrays (multiple batches of matrices)
- Optional computation of matrix inverses alongside Pfaffians
- Support for Pfaffian derivatives
- Performance benchmarking tools

## Usage Examples

### Basic Batched Computation
```python
from pfapack.ctypes import pfaffian_batched

# For a batch of matrices shape (batch_size, N, N)
pfaffians = pfaffian_batched(matrices)
```

### 4D Batched Computation
```python
from pfapack.ctypes import pfaffian_batched_4d

# For matrices shape (outer_batch, inner_batch, N, N)
pfaffians = pfaffian_batched_4d(matrices)
```

### With Inverse Computation
```python
from pfapack.ctypes import pfaffian_batched_4d_with_inverse

# Returns both Pfaffians and inverses
# inplace=True modifies input matrices to store inverses
pfaffians, inverses = pfaffian_batched_4d_with_inverse(
    matrices,
    inplace=False  # Whether to modify input matrices for inverses
)
```

### Pfaffian Derivatives
```python
from pfapack.ctypes import pfaffian_deriv_1, pfaffian_deriv_2
# First derivative
pfaffian_deriv_1(
    matrices_c_inv, # shape (outer_batch, inner_batch, n_sel, n_sel)
    db_mat,         # shape (outer_batch, N, N)
    selector,       # indices for selected matrix elements, shape (n_sel,)
    z_weights,      # grid point weights, shape (inner_batch,)
    pfad_output     # pre-allocated output array (outer_batch, inner_batch)
)
# Second derivative
pfaffian_deriv_2(
    matrices_c_inv, # shape (outer_batch, inner_batch, n_sel, n_sel)
    db_mat,         # shape (outer_batch, N, N)
    selector,       # indices for selected matrix elements, shape (n_sel,)
    z_weights,      # grid point weights, shape (inner_batch,)
    pfad2_output    # pre-allocated output array (outer_batch, inner_batch)
)
```

The derivatives are computed in-place, modifying the pre-allocated output arrays. Examples of usage can be found in `tests/test_pfaffian_deriv.py`.

## Testing and Examples

- Example code in `examples/`
- Test suite in `tests/`
- Run tests with `pytest tests` or by `cd`'ing into tests directory first
- Performance benchmarking example in `examples/07-performance.py`

---

### *Original PFAPACK README follows*

---

# `pfapack`: Efficient numerical computation of the Pfaffian for dense and banded skew-symmetric matrices

Code and algorithms are taken from [arXiv:1102.3440](https://arxiv.org/abs/1102.3440) which is authored by [Michael Wimmer](https://michaelwimmer.org/).

[![license](https://img.shields.io/github/license/basnijholt/pfapack)](https://github.com/basnijholt/pfapack/blob/master/LICENSE)
[![tests](https://github.com/basnijholt/pfapack/workflows/tests/badge.svg)](https://github.com/basnijholt/pfapack/actions?query=workflow%3Atests)
[![codecov](https://img.shields.io/codecov/c/github/basnijholt/pfapack)](https://codecov.io/gh/basnijholt/pfapack)
[![docs](https://img.shields.io/readthedocs/pfapack)](https://pfapack.readthedocs.io)
[![version](https://img.shields.io/pypi/v/pfapack)](https://pypi.org/project/pfapack/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/pfapack)](https://pypi.org/project/pfapack/)

### Install
Recommended way (because it includes faster C/FORTRAN bindings)
```bash
conda install -c conda-forge pfapack
```

Alternatively use
```bash
pip install pfapack
```

## Usage
```python
from pfapack import pfaffian as pf
import numpy.matlib

A = numpy.matlib.rand(100, 100)
A = A - A.T
pfa1 = pf.pfaffian(A)
pfa2 = pf.pfaffian(A, method="H")
pfa3 = pf.pfaffian_schur(A)

print(pfa1, pfa2, pfa3)
```

If installed with `conda`, C/FORTRAN code is included with Python bindings, use it like:
```python
from pfapack.ctypes import pfaffian as cpf

pfa1 = cpf(A)
pfa2 = cpf(A, method="H")

print(pfa1, pfa2)
```

## Citing
If you have used `pfapack` in your research, please cite it using the following `bib` entry:
```
@article{wimmer2012algorithm,
  title={Efficient numerical computation of the pfaffian for dense and banded skew-symmetric matrices},
  author={Michael Wimmer},
  journal={ACM Transactions on Mathematical Software (TOMS)},
  volume={38},
  number={4},
  pages={1--17},
  year={2012},
  publisher={ACM New York, NY, USA}
}
```

## License
MIT License

## Contributions
- Bas Nijholt
- [Michael Wimmer (author of the algorithms)](https://arxiv.org/abs/1102.3440)

