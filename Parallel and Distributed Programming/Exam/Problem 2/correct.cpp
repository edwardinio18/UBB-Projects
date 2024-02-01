#include <iostream>
#include <thread>
#include <mutex>
#include <list>

using namespace std;

template<typename T>
class ProducerConsumerQueue1 {
    list<T> items;
    bool isClosed = false;
    condition_variable cv;
    mutex mtx;
public:
    void enqueue(T v) {
        unique_lock<mutex> lck(mtx);
        items.push_back(v);
        cv.notify_one();
    }

    optional<T> dequeue() {
        unique_lock<mutex> lck(mtx);
        while (items.empty() && !isClosed) {
            cv.wait(lck);
        }
        if (!items.empty()) {
            optional<T> ret(items.front());
            items.pop_front();
            lck.unlock();
            return ret;
        }
        lck.unlock();
        return optional<T>();
    }

    void close() {
        unique_lock<mutex> lck(mtx);
        isClosed = true;
        cv.notify_all();
    }
};

template<typename T>
class ProducerConsumerQueue2 {
    list<T> items;
    bool isClosed = false;
    condition_variable cv;
    mutex mtx;

public:
    void enqueue(T v) {
        unique_lock<mutex> lck(mtx);
        items.push_back(v);
        cv.notify_one();
    }

    optional<T> dequeue() {
        unique_lock<mutex> lck(mtx);
        while (true) {
            // unique_lock<mutex> lck(mtx); // or here
            if (!items.empty()) {
                optional<T> ret(items.front());
                items.pop_front();
                return ret;
            }
            if (isClosed) {
                return optional<T>();
            }
            cv.wait(lck);
        }
    }

    void close() {
        unique_lock<mutex> lck(mtx);
        isClosed = true;
        cv.notify_all();
    }
};

template<typename T>
class Future1 {
    T val;
    bool hasValue;
    mutex mtx;
    condition_variable cv;
public:
    Future1() : hasValue(false) {}

    void set(T v) {
        unique_lock<mutex> lck(mtx);
        val = v;
        hasValue = true;
        cv.notify_all();
    }

    T get() {
        unique_lock<mutex> lck(mtx);
        while (!hasValue) {
            cv.wait(lck);
        }
        return val;
    }
};

template<typename T>
class Future2 {
    T val;
    bool hasValue;
    mutex mtx;
    condition_variable cv;
public:
    Future2() : hasValue(false) {}

    void set(T v) {
        unique_lock<mutex> lck(mtx);
        cv.notify_all();
        hasValue = true;
        val = v;
    }

    T get() {
        unique_lock<mutex> lck(mtx);
        while (!hasValue) {
            cv.wait(lck);
        }
        return val;
    }
};

template<typename T>
class Future3 {
    list<function<void(T)>> continuations;
    T val;
    bool hasValue;
    mutex mtx;
public:
    Future3() : hasValue(false) {}

    void set(T v) {
        unique_lock<mutex> lck(mtx);
        hasValue = true;
        val = v;
        for (function<void(T)> &f: continuations) {
            f(v);
        }
        continuations.clear();
        lck.unlock();
    }

    void addContinuation(function<void(T)> f) {
        unique_lock<mutex> lck(mtx);
        if (hasValue) {
            f(val);
        } else {
            continuations.push_back(f);
        }
    }
};

template<typename T>
class Future4 {
    list<function<void(T)>> continuations;
    T val;
    bool hasValue;
    mutex mtx;
public:
    Future4() : hasValue(false) {}

    void set(T v) {
        hasValue = true;
        val = v;
        for (function<void(T)> &f: continuations) {
            unique_lock<mutex> lck(mtx);
            f(v);
        }
        continuations.clear();
    }

    void addContinuation(function<void(T)> f) {
        unique_lock<mutex> lck(mtx);
        if (hasValue) {
            f(val);
        } else {
            continuations.push_back(f);
        }
    }
};

class ThreadPool {
    condition_variable cv;
    mutex mtx;
    list<function<void()>> work;
    vector<thread> threads;
    bool closed = false;

    void run() {
        unique_lock<mutex> lck(mtx);
        while (true) {
            if (!work.empty()) {
                function<void()> wi = work.front();
                work.pop_front();
                lck.unlock();
                wi();
                lck.lock();
            } else if (closed) {
                return;
            } else {
                cv.wait(lck);
            }
        }
    }

public:
    explicit ThreadPool(int n) {
        threads.reserve(n);
        for (int i = 0; i < n; ++i) {
            threads.emplace_back([this]() { run(); });
        }
    }

    void enqueue(function<void()> f) {
        unique_lock<mutex> lck(mtx);
        work.push_back(f);
        cv.notify_one();
    }

    void close() {
        unique_lock<mutex> lck(mtx);
        closed = true;
        cv.notify_all();
        lck.unlock();
        for (thread &th: threads) th.join();
    }
};

template<typename T>
class CountdownEvent {
    atomic<unsigned> count;
    mutex mtx;
    condition_variable cv;

public:
    explicit CountdownEvent(unsigned cnt) : count(cnt) {}

    void done() {
        unique_lock<mutex> lck(mtx);
        unsigned old = count.fetch_sub(1);
        if (old == 1) {
            cv.notify_all();
        }
        lck.unlock();
    }

    T wait() {
        unique_lock<mutex> lck(mtx);
        if (count == 0) return;
        while (count > 0) {
            cv.wait(lck);
        }
    }
};