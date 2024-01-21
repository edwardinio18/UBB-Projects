#ifndef POLYNOMIAL_H
#define POLYNOMIAL_H

#include <vector>
#include <string>

class Polynomial {
public:
    Polynomial();

    Polynomial(int n, const std::vector<int> &coefficients);

    std::string to_string() const;

    int get_n() const;

    const std::vector<int> &get_coefficients() const;

private:
    int n;
    std::vector<int> coefficients;
};

#endif // POLYNOMIAL_H
