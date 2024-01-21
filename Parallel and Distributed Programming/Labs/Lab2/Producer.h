#include <iostream>
#include <vector>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>

class Producer
{
private:
    int queueSize;
    std::queue<int> &queue;
    std::mutex &mutex;
    std::condition_variable &condition;
    const std::vector<int> &firstVector;
    const std::vector<int> &secondVector;

public:
    Producer(int size, std::queue<int> &q, std::mutex &mtx, std::condition_variable &cond, const std::vector<int> &first, const std::vector<int> &second)
        : queueSize(size), queue(q), mutex(mtx), condition(cond), firstVector(first), secondVector(second) {}

    void run()
    {
        for (size_t i = 0; i < firstVector.size(); ++i)
        {
            putProduct(firstVector[i] * secondVector[i]);
        }
        std::cout << "Producer produced" << std::endl;
    }

    void putProduct(int product)
    {
        std::unique_lock<std::mutex> lock(mutex);
        while (queue.size() >= queueSize)
        {
            std::cout << "The queue is full. Producer is waiting. Size: " << queueSize << std::endl;
            condition.wait(lock);
        }
        std::cout << "Producer adds to the queue the product " << product << std::endl;
        queue.push(product);
        condition.notify_all();
    }
};
