cmake_minimum_required(VERSION 3.25)
project(Lab3)

set(CMAKE_CXX_STANDARD 23)

add_executable(Lab3 main.cpp matrix.cpp multiplier_thread.cpp thread_pool.cpp)
