OBJECTS = skpfa_batched.o skpfa.o skpf10.o skbpfa.o skbpf10.o sktrf.o sktrd.o skbtrd.o

CC = gcc
CFLAGS = -O3 -fPIC -Wall -Wextra -std=c99 -fno-math-errno -ftree-vectorize -fomit-frame-pointer 
LIBS = -L../fortran -lpfapack -llapack -lblas

all: libcpfapack.so

libcpfapack.so: $(OBJECTS)
	$(CC) -shared -o $@ $(OBJECTS) $(LIBS)
	mkdir -p ../../pfapack
	cp libcpfapack.so ../../pfapack/

clean:
	rm -f *.o
	rm -f libcpfapack.so

.SUFFIXES: .o .c

.c.o:
	$(CC) $(CFLAGS) -c $< -o $@
