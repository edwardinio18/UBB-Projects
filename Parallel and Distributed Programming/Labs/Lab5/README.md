# Goal

The goal of this lab is to implement a simple but non-trivial parallel algorithm.

## Requirement

Perform the multiplication of 2 polynomials. Use both the regular O(n2) algorithm and the Karatsuba algorithm, and each
in both the sequential form and a parallelized form. Compare the 4 variants.

### The documentation will describe:

1. The algorithms used
2. The synchronization used in the parallelized variants
3. The performance measurements

## Results and Timings

### _First example_

**Degree: 100 - 60**

#### _Sequential Classic_

- Elapsed time: 0.000124805 seconds

#### _Sequential Karatsuba_

- Elapsed time: 0.00011741 seconds

#### _Parallel Classic_

- Elapsed time: 0.000459501 seconds

#### _Parallel Karatsuba_

- Elapsed time: 0.000370397 seconds

### _Second example_

**Degree: 10000 - 5000**

#### _Sequential Classic_

- Elapsed time: 0.834335 seconds

#### _Sequential Karatsuba_

- Elapsed time: 0.405886 seconds

#### _Parallel Classic_

- Elapsed time: 0.234432 seconds

#### _Parallel Karatsuba_

- Elapsed time: 0.142265 seconds

### Third example

**Degree: 100000 - 100000**

#### _Sequential Classic_

- Elapsed time: 127.545 seconds

#### _Sequential Karatsuba_

- Elapsed time: 23.1051 seconds

#### _Parallel Classic_

- Elapsed time: 35.1247 seconds

#### _Parallel Karatsuba_

- Elapsed time: 5.95162 seconds