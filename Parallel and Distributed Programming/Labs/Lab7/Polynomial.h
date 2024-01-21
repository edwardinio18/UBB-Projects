#ifndef LABORATORY_7_POLYNOMIAL_H
#define LABORATORY_7_POLYNOMIAL_H


#include <vector>

class Polynomial {
public:
    Polynomial(int n);

    Polynomial(int n, const std::vector<int> &coefficients);

    void GeneratePolynomial();

    int getN() const;

    int getCoefficient(int index) const;

    void setCoefficient(int index, int value);

    Polynomial Sum(const Polynomial &B) const;

    Polynomial Difference(const Polynomial &B) const;

    Polynomial GetFirstMCoefficients(int m) const;

    Polynomial GetLastMCoefficients(int m) const;

    Polynomial Shift(int m) const;

    std::string ToString() const;

    std::vector<int> GetCoefficients() const;

    Polynomial GetCoefficientsInRange(int start, int end) const;

private:
    int N;
    std::vector<int> Coefficients;
};


#endif //LABORATORY_7_POLYNOMIAL_H