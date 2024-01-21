import math


def fermat_factorization(N):
    # Check if N is even. Fermat's method works only on odd numbers.
    if N % 2 == 0:
        return "The number must be odd."

    multiplier = 1
    while True:
        adjusted_N = N * multiplier

        # Start with the smallest possible value of a, which is the ceiling of the square root of adjusted_N.
        a = math.ceil(math.sqrt(adjusted_N))

        while a < adjusted_N:
            # Compute b^2 as a^2 - adjusted_N
            b_square = a * a - adjusted_N

            # Calculate b as the integer square root of b^2
            b = math.isqrt(b_square)

            # If b^2 is a perfect square, then a and b are the factors of adjusted_N
            if b * b == b_square:
                return (a + b, a - b)

            # Increment a for the next iteration
            a += 1

        # Increment multiplier for the next iteration if no factors found
        multiplier += 1


try:
    N = int(input("Enter an odd number to factorize: "))
    factors = fermat_factorization(N)
    print(f"Factors of {N} are: {factors}")
except ValueError:
    print("Please enter a valid integer.")
