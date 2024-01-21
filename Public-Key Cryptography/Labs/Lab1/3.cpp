#include <iostream>
#include <chrono>
#include <cstdlib>

// Euclidean algorithm with subtraction to calculate GCD
long long euclidean_gcd(long long a, long long b) {
    if (a * b == 0) return a + b;
    while (a != b) {
        if (a > b) {
            a -= b;
        } else {
            b -= a;
        }
    }
    return a;
}

int main() {
    // Seed the random number generator with the current time
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    for (int i = 0; i < 10; ++i) {
        // Generate random big integers within a large range
        long long a = static_cast<long long>(std::rand()) % 100000000000000000LL + 1;
        long long b = static_cast<long long>(std::rand()) % 100000000000000000LL + 1;

        // Start measuring the time
        auto start = std::chrono::high_resolution_clock::now();

        long long result;
        // Repeat the GCD calculation 1,000 times for accurate timing
        for (int j = 0; j < 1000; ++j) {
            result = euclidean_gcd(a, b);
        }

        // Stop measuring the time
        auto stop = std::chrono::high_resolution_clock::now();
        // Calculate the time duration in microseconds
        auto duration = std::chrono::duration_cast<std::chrono::microseconds>(stop - start);

        // Display test information and timing results
        std::cout << "Test " << (i + 1) << ": GCD(" << a << ", " << b << ")\n";
        std::cout << "Custom Algorithm (Euclidean GCD with Subtraction): GCD = " << result << " (Time taken: " << duration.count() << " microseconds)\n";
    }

    auto start = std::chrono::high_resolution_clock::now();

    auto stop = std::chrono::high_resolution_clock::now();
        
    // Calculate the time duration in milliseconds
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start);

    // Display test information and timing results
    std::cout << "Test 11: GCD(0, 5)\n";
    std::cout << "Custom Algorithm (Euclidean GCD with Subtraction): GCD = " << euclidean_gcd(0, 5) << " (Time taken: " << duration.count() << " milliseconds)\n";

    return 0;
}
