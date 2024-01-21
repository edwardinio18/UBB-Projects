#include "Polynomial.h"

Polynomial::Polynomial() : n(0), coefficients({}) {}

Polynomial::Polynomial(int n, const std::vector<int> &coefficients) : n(n), coefficients(coefficients) {}

std::string Polynomial::to_string() const {
    std::string builder;
    for (int i = 0; i < n; ++i) {
        builder += std::to_string(coefficients[i]);
        if (i != 0) {
            builder += "x^" + std::to_string(i);
        }
        if (i != n - 1) {
            builder += " + ";
        }
    }
    return builder;
}

int Polynomial::get_n() const {
    return n;
}

const std::vector<int> &Polynomial::get_coefficients() const {
    return coefficients;
}