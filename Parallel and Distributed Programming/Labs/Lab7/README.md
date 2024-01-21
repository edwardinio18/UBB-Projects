Perform the multiplication of 2 polynomials, by distributing computation across several nodes using MPI. Use both the
regular O(n^2) algorithm and the Karatsuba algorithm. Compare the performance with the "regular" CPU implementation from
lab 5.

The documentation will describe:

- the algorithms,
- the distribution and communication,
- the performance measurements

### Install MPI on macOS

> brew install open-mpi

### Compile

> mpic++ -std=c++11 *.cpp -o main

### Run

> mpiexec -n 6 ./main

### Results

**A**: -4 + -8x^1 + 10x^2

**B**: -4 + -8x^1 + 10x^2 + -5x^3 + -4x^4 + -1x^5 + 5x^6 + 9x^7 + 0x^8 + -9x^9 + 9x^10 + 3x^11 + 2x^12 + -4x^13 +
9x^14 + 0x^15 + -7x^16 + -1x^17 + -9x^18 + 8x^19

**Rank**: 5

**Rank**: 1

**Rank**: 2

**Rank**: 3

**Rank**: 0

**Karatsuba Multiplication Time**: 9 microseconds

**Rank**: 4

**Start**: 0 -> End: 0

**Start**: 0 -> End: 0

**Rank**: 1

**Start**: 0 -> End: 0

**Rank**: 2

**Start**: 0 -> End: 0

**Rank**: 3

**Start**: 0 -> End: 0

**Rank**: 4

**Start**: 0 -> End: 3

**Rank**: 5

**Rank**: 0

**MPI Multiplication Time**: 33 microseconds