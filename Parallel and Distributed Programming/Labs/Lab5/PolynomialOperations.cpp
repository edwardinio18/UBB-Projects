#include "PolynomialOperations.h"
#include "Polynomial.h"
#include <vector>
#include <thread>

/**
 * Adds two polynomials and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The sum of the two polynomials.
 */
Polynomial PolynomialOperations::add(const Polynomial &A, const Polynomial &B) {
    int size = std::max(A.get_n(), B.get_n());
    std::vector<int> sumList(size, 0);

    for (int i = 0; i < B.get_n(); ++i) {
        sumList[i] = A.get_coefficients()[i] + B.get_coefficients()[i];
    }

    for (int i = B.get_n(); i < A.get_n(); ++i) {
        sumList[i] = A.get_coefficients()[i];
    }

    return Polynomial{size, sumList};
}

/**
 * Subtracts two polynomials and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The difference of the two polynomials.
 */
Polynomial PolynomialOperations::subtract(const Polynomial &A, const Polynomial &B) {
    int size = std::max(A.get_n(), B.get_n());
    std::vector<int> sumList(size, 0);

    for (int i = 0; i < B.get_n(); ++i) {
        sumList[i] = A.get_coefficients()[i] - B.get_coefficients()[i];
    }

    for (int i = B.get_n(); i < A.get_n(); ++i) {
        sumList[i] = A.get_coefficients()[i];
    }

    return Polynomial{size, sumList};
}

/**
 * Shifts a polynomial shift_by a given number of positions. The shifted positions are filled with zeroes.
 *
 * @param A - The polynomial to be shifted.
 * @param shift_by - The number of positions to shift by.
 * @return - The shifted polynomial.
 */
Polynomial PolynomialOperations::shift(const Polynomial &A, int shift_by) {
    std::vector<int> coeff;
    coeff.reserve(shift_by);
    for (int i = 0; i < shift_by; ++i) {
        coeff.push_back(0);
    }

    for (int i = 0; i < A.get_n(); ++i) {
        coeff.push_back(A.get_coefficients()[i]);
    }

    return Polynomial{A.get_n() + shift_by, coeff};
}

/**
 * Multiplies two polynomials using the classic algorithm and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The product of the two polynomials.
 */
Polynomial PolynomialOperations::multiply_classic(const Polynomial &A, const Polynomial &B) {
    int size = A.get_n() + B.get_n() - 1;
    std::vector<int> productList(size, 0);

    for (int i = 0; i < A.get_n(); ++i) {
        for (int j = 0; j < B.get_n(); ++j) {
            productList[i + j] += A.get_coefficients()[i] * B.get_coefficients()[j];
        }
    }

    return Polynomial{size, productList};
}

/**
 * Multiplies two polynomials using the Karatsuba algorithm and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The product of the two polynomials.
 */
Polynomial PolynomialOperations::multiply_karatsuba(const Polynomial &A, const Polynomial &B) {
    if (A.get_n() < 128 || B.get_n() < 128) {
        return multiply_classic(A, B);
    }

    int m = std::max(A.get_n(), B.get_n()) / 2;

    Polynomial lowA(m, std::vector<int>(A.get_coefficients().begin(), A.get_coefficients().begin() + m));
    Polynomial highA(A.get_n() - m, std::vector<int>(A.get_coefficients().begin() + m, A.get_coefficients().end()));
    Polynomial lowB(m, std::vector<int>(B.get_coefficients().begin(), B.get_coefficients().begin() + m));
    Polynomial highB(B.get_n() - m, std::vector<int>(B.get_coefficients().begin() + m, B.get_coefficients().end()));

    Polynomial result1 = multiply_karatsuba(lowA, lowB);
    Polynomial result2 = multiply_karatsuba(add(lowA, highA), add(lowB, highB));
    Polynomial result3 = multiply_karatsuba(highA, highB);

    Polynomial r1 = shift(result3, 2 * m);
    Polynomial r2 = shift(subtract(subtract(result2, result3), result1), m);

    return add(add(r1, r2), result1);
}

/**
 * Multiplies two polynomials using the classic algorithm in parallel and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The product of the two polynomials.
 */
Polynomial PolynomialOperations::multiply_classic_parallel(const Polynomial &A, const Polynomial &B) {
    int size = A.get_n() + B.get_n() - 1;
    std::vector<int> product(size, 0);

    int nrThreads = std::max(1, static_cast<int>(std::thread::hardware_concurrency()));
    int nr = std::max(1, size / nrThreads);
    std::vector<std::thread> threads;

    for (int i = 0; i < nrThreads; ++i) {
        int start = i * nr;
        int end = (i == nrThreads - 1) ? size : (i + 1) * nr;

        threads.emplace_back([start, end, &A, &B, &product]() {
            for (int i = start; i < end; ++i) {
                for (int j = 0; j <= i; ++j) {
                    if (j < A.get_n() && (i - j) < B.get_n()) {
                        product[i] += A.get_coefficients()[j] * B.get_coefficients()[i - j];
                    }
                }
            }
        });
    }

    for (auto &thread: threads) {
        thread.join();
    }

    return Polynomial{size, product};
}

/**
 * Multiplies two polynomials using the Karatsuba algorithm in parallel and returns the result.
 *
 * @param A - The first polynomial.
 * @param B - The second polynomial.
 * @return - The product of the two polynomials.
 */
Polynomial PolynomialOperations::multiply_karatsuba_parallel(const Polynomial &A, const Polynomial &B) {
    if (A.get_n() < 128 || B.get_n() < 128) {
        return multiply_classic_parallel(A, B);
    }

    int m = std::max(A.get_n(), B.get_n()) / 2;

    Polynomial lowA(m, std::vector<int>(A.get_coefficients().begin(), A.get_coefficients().begin() + m));
    Polynomial highA(A.get_n() - m, std::vector<int>(A.get_coefficients().begin() + m, A.get_coefficients().end()));
    Polynomial lowB(m, std::vector<int>(B.get_coefficients().begin(), B.get_coefficients().begin() + m));
    Polynomial highB(B.get_n() - m, std::vector<int>(B.get_coefficients().begin() + m, B.get_coefficients().end()));

    Polynomial result1;
    Polynomial result2;
    Polynomial result3;

    std::thread thread1([&]() {
        result1 = multiply_karatsuba_parallel(lowA, lowB);
    });
    std::thread thread2([&]() {
        result3 = multiply_karatsuba_parallel(highA, highB);
    });

    thread1.join();
    thread2.join();

    result2 = multiply_karatsuba_parallel(add(lowA, highA), add(lowB, highB));

    Polynomial r1 = shift(result3, 2 * m);
    Polynomial r2 = shift(subtract(subtract(result2, result3), result1), m);

    return add(add(r1, r2), result1);
}