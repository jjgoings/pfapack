#ifndef FORTRAN_MIXING_H
#define FORTRAN_MIXING_H

/* check if type of complex should be deducted from the compiler */
#if !defined(CPLUSPLUS_COMPLEX) && !defined(C99_COMPLEX) && !defined(STRUCT_COMPLEX)

#ifdef __cplusplus
#define CPLUSPLUS_COMPLEX
#else
#if __STDC_VERSION__ >= 199901L
#define C99_COMPLEX
#else
#define STRUCT_COMPLEX
#endif
#endif

#endif

// LAPACK function declarations
#ifdef __cplusplus
extern "C" {
#endif

// BLAS routines
void zgemv_(char* trans, int* m, int* n, void* alpha, void* a,
            int* lda, void* x, int* incx, void* beta, void* y,
            int* incy);

void zgemm_(char* transa, char* transb, int* m, int* n, int* k, void* alpha, void* a,
            int* lda, void* b, int* ldb, void* beta, void* c,
            int* inc);

// LU decomposition routines
void dgetrf_(int* m, int* n, double* a, int* lda,
             int* ipiv, int* info);
void zgetrf_(int* m, int* n, void* a, int* lda,
             int* ipiv, int* info);

// Matrix inverse routines
void dgetri_(int* n, double* a, int* lda, int* ipiv,
             double* work, int* lwork, int* info);
void zgetri_(int* n, void* a, int* lda, int* ipiv,
             void* work, int* lwork, int* info);

// Pfaffian computation routines
void PFAPACK_dskpfa_(char* uplo, char* mthd, int* n, double* a, int* lda,
                     double* pfaff, int* iwork, double* work, int* lwork,
                     int* info);
void PFAPACK_zskpfa_(char* uplo, char* mthd, int* n, void* a, int* lda,
                     void* pfaff, int* iwork, void* work, int* lwork,
                     double* rwork, int* info);

#ifdef __cplusplus
}
#endif

// Complex number handling based on compiler support
#ifdef CPLUSPLUS_COMPLEX

#include <complex>

typedef std::complex<double> doublecmplx;
typedef std::complex<float> floatcmplx;

using std::real;
using std::imag;
inline float realf(floatcmplx x)
{ return real(x); }
inline float imagf(floatcmplx x)
{ return imag(x); }

#elif defined(C99_COMPLEX)

#include <complex.h>

typedef float complex floatcmplx;
typedef double complex doublecmplx;

inline double real(doublecmplx x)
{ return creal(x); }
inline double imag(doublecmplx x)
{ return cimag(x); }
inline float realf(floatcmplx x)
{ return crealf(x); }
inline float imagf(floatcmplx x)
{ return cimagf(x); }

#elif defined(STRUCT_COMPLEX)

typedef struct {
    double re, im;
} doublecmplx;

typedef struct {
    float re, im;
} floatcmplx;

#define real(x) x.re
#define imag(x) x.im
#define realf(x) x.re
#define imagf(x) x.im

#endif

#define fortran_name(lcname, UCNAME) lcname##_

#endif
