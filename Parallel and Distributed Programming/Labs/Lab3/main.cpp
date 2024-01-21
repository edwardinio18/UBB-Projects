#pragma once

#include <iostream>
#include <vector>
#include <thread>
#include <future>

#include "matrix.cpp"
#include "multiplier_thread.cpp"
#include "thread_pool.cpp"

const int THREAD_COUNT = 100;

// Generate tasks for matrix multiplication
std::vector<MultiplierThread> generateTasks(const Matrix &m1, const Matrix &m2, Matrix &result) {
    std::vector<MultiplierThread> threads;
    int positions = result.getColumns() * result.getRows();
    int basePositionsPerThread = positions / THREAD_COUNT;
    int threadsWithAnExtraPosition = positions % THREAD_COUNT;
    int coveredPositions = 0;

    for (int threadIndex = 0; threadIndex < THREAD_COUNT; threadIndex++) {
        int positionsForCurrentThread = basePositionsPerThread;
        if (threadIndex < threadsWithAnExtraPosition) {
            positionsForCurrentThread++;
        }
        threads.emplace_back(m1, m2, result, coveredPositions / result.getColumns(),
                             coveredPositions % result.getColumns(),
                             positionsForCurrentThread);
        coveredPositions += positionsForCurrentThread;
    }

    return threads;
}

void performMultiplicationWithoutThreadPool(const Matrix &m1, const Matrix &m2, Matrix &result, int matrixNumber) {
    auto tasks = generateTasks(m1, m2, result);
    std::vector<std::thread> threads;

    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();

    // Create threads and execute tasks directly.
    threads.reserve(tasks.size());
    for (auto &task: tasks) {
        threads.emplace_back(task);
    }

    // Wait for all threads to complete
    for (auto &thread: threads) {
        if (thread.joinable()) {
            thread.join();
        }
    }

    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();

    std::cout << "Result matrix " << matrixNumber << ":" << std::endl;
    std::cout << result << std::endl;
    std::cout << "Thread creation for matrix " << matrixNumber << " took "
              << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count()
              << " microseconds." << std::endl;
    std::cout << "Total time for matrix multiplication " << matrixNumber << " took "
              << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count()
              << " microseconds." << std::endl;
    std::cout << std::endl;
}

void performMultiplicationWithThreadPool(const Matrix &m1, const Matrix &m2, Matrix &result, int matrixNumber) {
    ThreadPool pool(THREAD_COUNT);

    auto tasks = generateTasks(m1, m2, result);
    std::vector<std::future<void>> futures;

    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();

    // Enqueue tasks in the ThreadPool instead of creating threads.
    futures.reserve(tasks.size());
    for (auto &task: tasks) {
        futures.emplace_back(
                pool.enqueue([&task] {
                    task();
                })
        );
    }

    // Wait for all tasks to complete
    for (auto &future: futures) {
        future.get();
    }

    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();

    std::cout << "Result matrix " << matrixNumber << ":" << std::endl;
    std::cout << result << std::endl;
    std::cout << "Thread creation for matrix " << matrixNumber << " took "
              << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count()
              << " microseconds." << std::endl;
    std::cout << "Total time for matrix multiplication " << matrixNumber << " took "
              << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count()
              << " microseconds." << std::endl;
    std::cout << std::endl;
};

int main() {
    // Matrices initialization
    Matrix m1(50, 50), m2(50, 50), m3(5, 4), m4(4, 6), m5(2, 5), m6(5, 2);
    Matrix result1(m1.getRows(), m2.getColumns()), result2(m3.getRows(), m4.getColumns()), result3(m5.getRows(),
                                                                                                   m6.getColumns());
    m1.fillMatrixRandomly();
    m2.fillMatrixRandomly();
    m3.fillMatrixRandomly();
    m4.fillMatrixRandomly();
    m5.fillMatrixRandomly();
    m6.fillMatrixRandomly();

    performMultiplicationWithThreadPool(m1, m2, result1, 1);
    performMultiplicationWithoutThreadPool(m1, m2, result2, 2);

    std::cout << '\n';

    performMultiplicationWithThreadPool(m3, m4, result3, 3);
    performMultiplicationWithoutThreadPool(m3, m4, result3, 4);

    std::cout << '\n';

    performMultiplicationWithThreadPool(m5, m6, result3, 5);
    performMultiplicationWithoutThreadPool(m5, m6, result3, 6);

    return 0;
}
