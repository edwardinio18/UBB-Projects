#include <iostream>
#include <chrono>
#include <cstdlib>

// Standard GCD Algorithm (Euclidean Algorithm)
int gcd(int a, int b) {
    if (b == 0)
        return a;
    return gcd(b, a % b);
}

int main() {
    // Seed the random number generator with the current time
    std::srand(static_cast<unsigned>(std::time(nullptr)));

    for (int i = 0; i < 10; ++i) {
        // Generate random numbers a and b within the range [1, 100]
        int a = std::rand() % 100 + 1;
        int b = std::rand() % 100 + 1;

        // Start measuring the time
        auto start = std::chrono::high_resolution_clock::now();
        
        // Repeat the GCD calculation 1,000,000 times for accurate timing
        for (int j = 0; j < 1000000; ++j) {
            int result = gcd(a, b);
        }

        // Stop measuring the time
        auto stop = std::chrono::high_resolution_clock::now();
        
        // Calculate the time duration in milliseconds
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start);

        // Display test information and timing results
        std::cout << "Test " << (i + 1) << ": GCD(" << a << ", " << b << ")\n";
        std::cout << "Euclidean Algorithm: GCD = " << gcd(a, b) << " (Time taken: " << duration.count() << " milliseconds)\n";
    }

    auto start = std::chrono::high_resolution_clock::now();

    auto stop = std::chrono::high_resolution_clock::now();
        
    // Calculate the time duration in milliseconds
    auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start);

    // Display test information and timing results
    std::cout << "Test 11: GCD(0, 5)\n";
    std::cout << "Euclidean Algorithm: GCD = " << gcd(0, 5) << " (Time taken: " << duration.count() << " milliseconds)\n";

    return 0;
}
