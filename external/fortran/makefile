FORT = gfortran
FFLAGS = -O3 -march=native -ffast-math -funroll-loops -fimplicit-none
LDFLAGS = -flto

OBJECTS= slasktrd.o slasktrf.o sskbpf10.o sskbpfa.o sskbtrd.o \
    sskmv.o sskpf10.o sskpfa.o sskr2.o sskr2k.o ssktd2.o \
    ssktf2.o ssktrd.o ssktrf.o \
    dlasktrd.o dlasktrf.o dskbpf10.o dskbpfa.o dskbtrd.o \
    dskmv.o dskpf10.o dskpfa.o dskr2.o dskr2k.o dsktd2.o \
    dsktf2.o dsktrd.o dsktrf.o \
    clasktrd.o clasktrf.o cskbpf10.o cskbpfa.o cskbtrd.o \
    cskmv.o cskpf10.o cskpfa.o cskr2.o cskr2k.o csktd2.o \
    csktf2.o csktrd.o csktrf.o \
    zlasktrd.o zlasktrf.o zskbpf10.o zskbpfa.o zskbtrd.o \
    zskmv.o zskpf10.o zskpfa.o zskr2.o zskr2k.o zsktd2.o \
    zsktf2.o zsktrd.o zsktrf.o mul10.o\
    precision.o f77_interface.o f95_interface.o message.o \
    skpfa.o skpf10.o skbpfa.o skbpf10.o sktrd.o sktd2.o \
    sktrf.o sktf2.o skbtrd.o \

all: $(OBJECTS)
	$(AR) rvu libpfapack.a $(OBJECTS)

clean:
	rm -f *.o
	rm -f *.mod
	rm -f libpfapack.a

.SUFFIXES: .o .f .f90

.f90.o:
	$(FORT) $(FFLAGS) -c $< -o $@

.f.o:
	$(FORT) $(FFLAGS) -c $< -o $@
