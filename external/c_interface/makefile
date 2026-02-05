OBJECTS = pfader.o skpfa_batched.o skpfa.o skpf10.o skbpfa.o skbpf10.o sktrf.o sktrd.o skbtrd.o

CC = gcc
# Use PFAPACK_MARCH env var for CPU target
# Default: x86-64 on Intel/AMD for CI portability, native on ARM
UNAME_M := $(shell uname -m)
ifeq ($(UNAME_M),x86_64)
  DEFAULT_MARCH = x86-64
  MTUNE = -mtune=generic
else ifeq ($(UNAME_M),amd64)
  DEFAULT_MARCH = x86-64
  MTUNE = -mtune=generic
else
  DEFAULT_MARCH = native
  MTUNE =
endif
MARCH ?= $(or $(PFAPACK_MARCH),$(DEFAULT_MARCH))
CFLAGS = -O3 -march=$(MARCH) $(MTUNE) -fPIC -Wall -Wextra -std=c99 -fno-math-errno -ftree-vectorize -fomit-frame-pointer 
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
