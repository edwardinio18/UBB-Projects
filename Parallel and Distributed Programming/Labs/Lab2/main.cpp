#include <iostream>
#include <vector>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <random>

#include "Producer.h"
#include "Consumer.h"

int main()
{
    std::cout << "vectorSize: ";
    int vectorSize;
    std::cin >> vectorSize;

    std::vector<int> firstVector;
    std::vector<int> secondVector;
    std::default_random_engine generator;
    std::uniform_int_distribution<int> distribution(0, 10);

    for (int i = 0; i < vectorSize; ++i)
    {
        firstVector.push_back(distribution(generator));
        secondVector.push_back(distribution(generator));
    }

    std::cout << "First vector: ";
    for (int num : firstVector)
    {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    std::cout << "Second vector: ";
    for (int num : secondVector)
    {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    int sharedDataSize = vectorSize / 2;
    std::queue<int> sharedData;
    std::mutex mutex;
    std::condition_variable condition;

    Producer producer(sharedDataSize, sharedData, mutex, condition, firstVector, secondVector);
    Consumer consumer(sharedData, mutex, condition, vectorSize);

    std::thread producerThread([&producer]
                               { producer.run(); });
    std::thread consumerThread([&consumer]
                               { consumer.run(); });

    producerThread.join();
    consumerThread.join();

    std::cout << "Threaded sum: " << consumer.getSum() << std::endl;

    int sum = 0;
    for (int i = 0; i < vectorSize; ++i)
        sum += firstVector[i] * secondVector[i];

    std::cout << "Correct sum: " << sum << std::endl;

    return 0;
}
