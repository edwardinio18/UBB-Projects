#include "Util.h"
#include "Polynomial.h"
#include <iostream>

Polynomial Util::MpiMultiplication(const Polynomial &A, const Polynomial &B, int start, int end) {
    std::cout << "Start: " << start << " -> " << "End: " << end << std::endl;
    int DegreeMul = A.getN() + B.getN() - 1;
    Polynomial polyMul(DegreeMul);
    for (int i = start; i < end; i++) {
        for (int j = 0; j < B.getN(); j++) {
            polyMul.setCoefficient(i + j, polyMul.getCoefficient(i + j) + A.getCoefficient(i) * B.getCoefficient(j));
        }
    }
    return polyMul;
}

Polynomial Util::MpiKaratsuba(const Polynomial &A, const Polynomial &B, int start, int end) {
    std::cout << "Start: " << start << " -> " << "End: " << end << std::endl;
    int DegreeMul = A.getN() + B.getN() - 1;
    Polynomial polyMul(DegreeMul);

    if (start >= end) {
        return polyMul;
    }

    if (end - start <= 50) {
        for (int i = start; i < end; i++) {
            for (int j = 0; j < B.getN(); j++) {
                polyMul.setCoefficient(i + j,
                                       polyMul.getCoefficient(i + j) + A.getCoefficient(i) * B.getCoefficient(j));
            }
        }
    } else {
        int mid = (start + end) / 2;

        Polynomial lowA = A.GetCoefficientsInRange(start, mid);
        Polynomial highA = A.GetCoefficientsInRange(mid, end);
        Polynomial lowB = B.GetCoefficientsInRange(start, mid);
        Polynomial highB = B.GetCoefficientsInRange(mid, end);

        Polynomial z1 = MpiKaratsuba(lowA, lowB, start, mid);
        Polynomial z2 = MpiKaratsuba(lowA.Sum(highA), lowB.Sum(highB), start, end);
        Polynomial z3 = MpiKaratsuba(highA, highB, mid, end);

        Polynomial result1 = z3.Shift(2 * (mid - start));
        Polynomial result2 = z2.Difference(z3).Difference(z1).Shift(mid - start);
        Polynomial result3 = result1.Sum(result2).Sum(z1);

        polyMul.Sum(result3);
    }

    return polyMul;
}
