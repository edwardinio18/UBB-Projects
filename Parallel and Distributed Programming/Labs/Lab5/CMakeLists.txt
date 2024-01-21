cmake_minimum_required(VERSION 3.25)
project(Lab5)

set(CMAKE_CXX_STANDARD 14)

include_directories(.)

add_executable(Lab5
        main.cpp Polynomial.cpp Polynomial.h PolynomialOperations.cpp PolynomialOperations.h)
