#ifndef POLYNOMIAL_OPERATIONS_H
#define POLYNOMIAL_OPERATIONS_H

#include "Polynomial.h"
#include <vector>

class PolynomialOperations {
public:
    static Polynomial add(const Polynomial &A, const Polynomial &B);

    static Polynomial subtract(const Polynomial &A, const Polynomial &B);

    static Polynomial shift(const Polynomial &A, int shift_by);

    static Polynomial multiply_classic(const Polynomial &A, const Polynomial &B);

    static Polynomial multiply_karatsuba(const Polynomial &A, const Polynomial &B);

    static Polynomial multiply_classic_parallel(const Polynomial &A, const Polynomial &B);

    static Polynomial multiply_karatsuba_parallel(const Polynomial &A, const Polynomial &B);
};

#endif // POLYNOMIAL_OPERATIONS_H
