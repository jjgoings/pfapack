      SUBROUTINE ZSKR2(UPLO,N,ALPHA,X,INCX,Y,INCY,A,LDA)
*     .. Scalar Arguments ..
      DOUBLE COMPLEX ALPHA
      INTEGER INCX,INCY,LDA,N
      CHARACTER UPLO
*     ..
*     .. Array Arguments ..
      DOUBLE COMPLEX A(LDA,*),X(*),Y(*)
*     ..
*
*  Purpose
*  =======
*
*  ZSKR2  performs the skew-symmetric rank 2 operation
*
*     A := alpha*x*y^T - alpha *y*x^T + A,
*
*  where alpha is a scalar, x and y are n element vectors and A is an n
*  by n skew-symmetric matrix (A^T=-A).
*
*  Arguments
*  ==========
*
*  UPLO   - CHARACTER*1.
*           On entry, UPLO specifies whether the upper or lower
*           triangular part of the array A is to be referenced as
*           follows:
*
*              UPLO = 'U' or 'u'   Only the upper triangular part of A
*                                  is to be referenced.
*
*              UPLO = 'L' or 'l'   Only the lower triangular part of A
*                                  is to be referenced.
*
*           Unchanged on exit.
*
*  N      - INTEGER.
*           On entry, N specifies the order of the matrix A.
*           N must be at least zero.
*           Unchanged on exit.
*
*  ALPHA  - DOUBLE COMPLEX      .
*           On entry, ALPHA specifies the scalar alpha.
*           Unchanged on exit.
*
*  X      - DOUBLE COMPLEX       array of dimension at least
*           ( 1 + ( n - 1 )*abs( INCX ) ).
*           Before entry, the incremented array X must contain the n
*           element vector x.
*           Unchanged on exit.
*
*  INCX   - INTEGER.
*           On entry, INCX specifies the increment for the elements of
*           X. INCX must not be zero.
*           Unchanged on exit.
*
*  Y      - DOUBLE COMPLEX       array of dimension at least
*           ( 1 + ( n - 1 )*abs( INCY ) ).
*           Before entry, the incremented array Y must contain the n
*           element vector y.
*           Unchanged on exit.
*
*  INCY   - INTEGER.
*           On entry, INCY specifies the increment for the elements of
*           Y. INCY must not be zero.
*           Unchanged on exit.
*
*  A      - DOUBLE COMPLEX       array of DIMENSION ( LDA, n ).
*           Before entry with  UPLO = 'U' or 'u', the leading n by n
*           upper triangular part of the array A must contain the upper
*           triangular part of the skew-symmetric matrix and the strictly
*           lower triangular part of A is not referenced. On exit, the
*           upper triangular part of the array A is overwritten by the
*           upper triangular part of the updated matrix.
*           Before entry with UPLO = 'L' or 'l', the leading n by n
*           lower triangular part of the array A must contain the lower
*           triangular part of the skew-symmetric matrix and the strictly
*           upper triangular part of A is not referenced. On exit, the
*           lower triangular part of the array A is overwritten by the
*           lower triangular part of the updated matrix.
*           Note that the imaginary parts of the diagonal elements need
*           not be set, they are assumed to be zero, and on exit they
*           are set to zero.
*
*  LDA    - INTEGER.
*           On entry, LDA specifies the first dimension of A as declared
*           in the calling (sub) program. LDA must be at least
*           max( 1, n ).
*           Unchanged on exit.
*
*
*  Level 2 Blas routine.
*
*  -- Written on 10/22/2010
*     Michael Wimmer, Universiteit Leiden
*
*
*     .. Parameters ..
      DOUBLE COMPLEX ZERO
      PARAMETER (ZERO= (0.0D+0,0.0D+0))
*     ..
*     .. Local Scalars ..
      DOUBLE COMPLEX TEMP1,TEMP2
      INTEGER I,INFO,IX,IY,J,JX,JY,KX,KY
*     ..
*     .. External Functions ..
      LOGICAL LSAME
      EXTERNAL LSAME
*     ..
*     .. External routines ..
      EXTERNAL XERBLA
*     ..
*     .. Intrinsic Functions ..
      INTRINSIC MAX
*     ..
*
*     Test the input parameters.
*
      INFO = 0
      IF (.NOT.LSAME(UPLO,'U') .AND. .NOT.LSAME(UPLO,'L')) THEN
          INFO = 1
      ELSE IF (N.LT.0) THEN
          INFO = 2
      ELSE IF (INCX.EQ.0) THEN
          INFO = 5
      ELSE IF (INCY.EQ.0) THEN
          INFO = 7
      ELSE IF (LDA.LT.MAX(1,N)) THEN
          INFO = 9
      END IF
      IF (INFO.NE.0) THEN
          CALL XERBLA('ZSKR2 ',INFO)
          RETURN
      END IF
*
*     Quick return if possible.
*
      IF ((N.EQ.0) .OR. (ALPHA.EQ.ZERO)) RETURN
*
*     Set up the start points in X and Y if the increments are not both
*     unity.
*
      IF ((INCX.NE.1) .OR. (INCY.NE.1)) THEN
          IF (INCX.GT.0) THEN
              KX = 1
          ELSE
              KX = 1 - (N-1)*INCX
          END IF
          IF (INCY.GT.0) THEN
              KY = 1
          ELSE
              KY = 1 - (N-1)*INCY
          END IF
          JX = KX
          JY = KY
      END IF
*
*     Start the operations. In this version the elements of A are
*     accessed sequentially with one pass through the triangular part
*     of A.
*
      IF (LSAME(UPLO,'U')) THEN
*
*        Form  A  when A is stored in the upper triangle.
*
          IF ((INCX.EQ.1) .AND. (INCY.EQ.1)) THEN
              DO 20 J = 1,N
                  IF ((X(J).NE.ZERO) .OR. (Y(J).NE.ZERO)) THEN
                      TEMP1 = ALPHA*Y(J)
                      TEMP2 = ALPHA*X(J)
                      DO 10 I = 1,J - 1
                          A(I,J) = A(I,J) + X(I)*TEMP1 - Y(I)*TEMP2
   10                 CONTINUE
                      A(J,J) = ZERO
                  ELSE
                      A(J,J) = ZERO
                  END IF
   20         CONTINUE
          ELSE
              DO 40 J = 1,N
                  IF ((X(JX).NE.ZERO) .OR. (Y(JY).NE.ZERO)) THEN
                      TEMP1 = ALPHA*Y(JY)
                      TEMP2 = ALPHA*X(JX)
                      IX = KX
                      IY = KY
                      DO 30 I = 1,J - 1
                          A(I,J) = A(I,J) + X(IX)*TEMP1 - Y(IY)*TEMP2
                          IX = IX + INCX
                          IY = IY + INCY
   30                 CONTINUE
                      A(J,J) = ZERO
                  ELSE
                      A(J,J) = ZERO
                  END IF
                  JX = JX + INCX
                  JY = JY + INCY
   40         CONTINUE
          END IF
      ELSE
*
*        Form  A  when A is stored in the lower triangle.
*
          IF ((INCX.EQ.1) .AND. (INCY.EQ.1)) THEN
              DO 60 J = 1,N
                  IF ((X(J).NE.ZERO) .OR. (Y(J).NE.ZERO)) THEN
                      TEMP1 = ALPHA*Y(J)
                      TEMP2 = ALPHA*X(J)
                      A(J,J) = ZERO
                      DO 50 I = J + 1,N
                          A(I,J) = A(I,J) + X(I)*TEMP1 - Y(I)*TEMP2
   50                 CONTINUE
                  ELSE
                      A(J,J) = ZERO
                  END IF
   60         CONTINUE
          ELSE
              DO 80 J = 1,N
                  IF ((X(JX).NE.ZERO) .OR. (Y(JY).NE.ZERO)) THEN
                      TEMP1 = ALPHA*Y(JY)
                      TEMP2 = ALPHA*X(JX)
                      A(J,J) = ZERO
                      IX = JX
                      IY = JY
                      DO 70 I = J + 1,N
                          IX = IX + INCX
                          IY = IY + INCY
                          A(I,J) = A(I,J) + X(IX)*TEMP1 - Y(IY)*TEMP2
   70                 CONTINUE
                  ELSE
                      A(J,J) = ZERO
                  END IF
                  JX = JX + INCX
                  JY = JY + INCY
   80         CONTINUE
          END IF
      END IF
*
      RETURN
*
*     End of ZSKR2 .
*
      END

*     ================================================================
*     Internal unit-stride kernels for factorization hot path
*     These assume valid inputs and INCX=INCY=1
*     ================================================================

      SUBROUTINE ZSKR2_U1(N,ALPHA,X,Y,A,LDA)
*     Internal: Upper triangle, INCX=INCY=1, no validation
*     .. Scalar Arguments ..
      DOUBLE COMPLEX ALPHA
      INTEGER LDA,N
*     ..
*     .. Array Arguments ..
      DOUBLE COMPLEX A(LDA,*),X(*),Y(*)
*     ..
*     .. Local Scalars ..
      DOUBLE COMPLEX TEMP1,TEMP2,ZERO
      INTEGER I,J
      PARAMETER (ZERO= (0.0D+0,0.0D+0))
*     ..
      IF (N.LE.0) RETURN
      DO 20 J = 1,N
          TEMP1 = ALPHA*Y(J)
          TEMP2 = ALPHA*X(J)
          DO 10 I = 1,J - 1
              A(I,J) = A(I,J) + X(I)*TEMP1 - Y(I)*TEMP2
   10     CONTINUE
          A(J,J) = ZERO
   20 CONTINUE
      RETURN
      END

      SUBROUTINE ZSKR2_L1(N,ALPHA,X,Y,A,LDA)
*     Internal: Lower triangle, INCX=INCY=1, no validation
*     .. Scalar Arguments ..
      DOUBLE COMPLEX ALPHA
      INTEGER LDA,N
*     ..
*     .. Array Arguments ..
      DOUBLE COMPLEX A(LDA,*),X(*),Y(*)
*     ..
*     .. Local Scalars ..
      DOUBLE COMPLEX TEMP1,TEMP2,ZERO
      INTEGER I,J
      PARAMETER (ZERO= (0.0D+0,0.0D+0))
*     ..
      IF (N.LE.0) RETURN
      DO 20 J = 1,N
          TEMP1 = ALPHA*Y(J)
          TEMP2 = ALPHA*X(J)
          A(J,J) = ZERO
          DO 10 I = J + 1,N
              A(I,J) = A(I,J) + X(I)*TEMP1 - Y(I)*TEMP2
   10     CONTINUE
   20 CONTINUE
      RETURN
      END

*     ================================================================
*     Additional internal BLAS-1 kernels for tiny n hot path
*     ================================================================

      INTEGER FUNCTION IZAMAX_U1(N, X)
*     Internal: unit-stride IZAMAX, no validation
*     Uses 1-norm (|Re| + |Im|) to match BLAS IZAMAX
      INTEGER N, I
      DOUBLE COMPLEX X(*)
      DOUBLE PRECISION BEST, T
      IF (N.LE.0) THEN
          IZAMAX_U1 = 0
          RETURN
      END IF
      IZAMAX_U1 = 1
      IF (N.EQ.1) RETURN
      BEST = DABS(DBLE(X(1))) + DABS(DIMAG(X(1)))
      DO 10 I = 2, N
          T = DABS(DBLE(X(I))) + DABS(DIMAG(X(I)))
          IF (T.GT.BEST) THEN
              BEST = T
              IZAMAX_U1 = I
          END IF
   10 CONTINUE
      RETURN
      END

      SUBROUTINE ZSCAL_U1(N, ALPHA, X)
*     Internal: unit-stride ZSCAL, no validation
      INTEGER N, I
      DOUBLE COMPLEX ALPHA, X(*)
      IF (N.LE.0) RETURN
      DO 10 I = 1, N
          X(I) = ALPHA * X(I)
   10 CONTINUE
      RETURN
      END

      SUBROUTINE ZSWAP_U1(N, X, Y)
*     Internal: unit-stride ZSWAP, no validation
      INTEGER N, I
      DOUBLE COMPLEX X(*), Y(*), TEMP
      IF (N.LE.0) RETURN
      DO 10 I = 1, N
          TEMP = X(I)
          X(I) = Y(I)
          Y(I) = TEMP
   10 CONTINUE
      RETURN
      END

      SUBROUTINE ZNEG_U1(N, X)
*     Internal: negate unit-stride vector (X = -X)
      INTEGER N, I
      DOUBLE COMPLEX X(*)
      IF (N.LE.0) RETURN
      DO 10 I = 1, N
          X(I) = -X(I)
   10 CONTINUE
      RETURN
      END

      SUBROUTINE ZSWAPNEG_MIX(M, X, Y, LDY)
*     Internal: fused swap-and-negate for mixed stride vectors
*     X is unit-stride column segment of length M
*     Y is strided row segment with stride LDY
*     Result: X(i) <- -Y(1+(i-1)*LDY), Y(1+(i-1)*LDY) <- -X(i)_old
      INTEGER M, LDY, I, IY
      DOUBLE COMPLEX X(*), Y(*), T
      IF (M.LE.0) RETURN
      IY = 1
      DO 10 I = 1, M
          T = X(I)
          X(I) = -Y(IY)
          Y(IY) = -T
          IY = IY + LDY
   10 CONTINUE
      RETURN
      END
