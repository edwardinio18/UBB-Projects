#include <iostream>
#include <queue>
#include <thread>
#include <mutex>
#include <condition_variable>

class Consumer
{
private:
    std::queue<int> &queue;
    std::mutex &mutex;
    std::condition_variable &condition;
    int iterations;
    int sum;

public:
    Consumer(std::queue<int> &q, std::mutex &mtx, std::condition_variable &cond, int iters)
        : queue(q), mutex(mtx), condition(cond), iterations(iters), sum(0) {}

    int getSum()
    {
        return sum;
    }

    void run()
    {
        for (int i = 0; i < iterations; ++i)
        {
            sum += getProduct();
        }
        std::cout << "Consumer consumed" << std::endl;
    }

    int getProduct()
    {
        std::unique_lock<std::mutex> lock(mutex);
        while (queue.empty())
        {
            std::cout << "The queue is empty. Consumer is waiting" << std::endl;
            condition.wait(lock);
        }
        int product = queue.front();
        queue.pop();
        std::cout << "Consumer gets from queue the product " << product << std::endl;
        condition.notify_all();
        return product;
    }
};