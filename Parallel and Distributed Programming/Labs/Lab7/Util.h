#ifndef LABORATORY_7_UTIL_H
#define LABORATORY_7_UTIL_H

#include "Polynomial.h"

class Util {
public:
    static Polynomial MpiMultiplication(const Polynomial &A, const Polynomial &B, int start, int end);

    static Polynomial MpiKaratsuba(const Polynomial &A, const Polynomial &B, int start, int end);
};

#endif //LABORATORY_7_UTIL_H