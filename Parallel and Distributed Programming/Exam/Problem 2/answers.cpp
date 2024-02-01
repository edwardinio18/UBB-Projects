#include <iostream>
#include <thread>
#include <mutex>
#include <list>

using namespace std;

/// ISSUE: two simultaneous calls to dequeue() may deadlock;
/// ANSWER: Let’s say the first thread removes the last item
/// from the list, and at the same time,
/// the second thread enters the while loop, checking
/// the state of the list before it being emptied by
/// the other thread (as the modification of the list
/// is not guarded by a lock, this is possible). Then,
/// the second thread will forever wait to be notified,
/// which won’t happen until the threads are closed at
/// the end, resulting in a possible deadlock.

/// ISSUE: two simultaneous calls to dequeue() may result in corrupted items list;
/// ANSWER: This happens because the lock is not used correspondingly. In this situation,
/// two threads can read the same value and pop it twice, resulting in a corrupted item list.

/// ISSUE: a call to dequeue() can result data corruption or undefined behavior if simultaneous with the call enqueue();
/// ANSWER: The dequeue() call modifies the list without locking it => with the enqueue call happening at the same time,
/// it might corrupt the list.
template<typename T>
class ProducerConsumerQueue1 {
    list <T> items;
    bool isClosed = false;
    condition_variable cv;
    mutex mtx;
public:
    void enqueue(T v) {
        unique_lock <mutex> lck(mtx);
        items.push_back(v);
        cv.notify_one();
    }

    optional <T> dequeue() {
        unique_lock <mutex> lck(mtx); // statement 1
        while (items.empty() && !isClosed) {
            // place 1
            cv.wait(lck);
            // place 2
        }
        // lck.unlock(); // statement 2 - ISSUE
        if (!items.empty()) {
            optional <T> ret(items.front());
            items.pop_front();
            // for the too early unlock of the mutex
            lck.unlock(); // place 3 - FIX
            return ret;
        }
        // for the too early unlock of the mutex
        lck.unlock(); // place 4 - FIX
        return optional<T>();
    }

    void close() {
        unique_lock <mutex> lck(mtx);
        isClosed = true;
        cv.notify_all();
    }
};

/// Same as ProducerConsumerQueue1 but with a different approach
template<typename T>
class ProducerConsumerQueue2 {
    list <T> items;
    bool isClosed = false;
    condition_variable cv;
    mutex mtx;

public:
    void enqueue(T v) {
        unique_lock <mutex> lck(mtx);
        items.push_back(v);
        cv.notify_one();
    }

    optional <T> dequeue() {
        // we lock sensitive resources before working with them
        unique_lock <mutex> lck(mtx); // place 1 - FIX 1
        while (true) {
            // you can have a lock in while loop bcs after it unlocks
            // unique_lock<mutex> lck(mtx); // place 2 - OR FIX 2
            if (!items.empty()) {
                // place 3
                optional <T> ret(items.front());
                items.pop_front();
                return ret;
            }
            if (isClosed) {
                return optional<T>();
            }
            // unique_lock<mutex> lck(mtx); // statement 1 - ISSUE
            cv.wait(lck); // unlock the mutex and wait for a notification
        }
    }

    void close() {
        unique_lock <mutex> lck(mtx);
        isClosed = true;
        cv.notify_all();
    }
};

/// ISSUE: a call to get() can deadlock if simultaneous with the call to set()
/// ANSWER: Let’s say get() acquires the lock and then releases it in the wait.
/// Then, set() will notify and get() will get the lock, see that hasValue is
/// false and then wait again. set() will change the value of hasValue but it
/// won’t call notify again, so it’s possible that the get() thread will wait
/// forever and not be notified.

/// ISSUE: a call to get() can deadlock if called after set()
/// ANSWER: The calls are made on the same thread. When we call get, it will
/// block at the wait line until it is notified, but it won’t be notified
/// because the set() is called after get(), so it will wait forever.
template<typename T>
class Future1 {
    T val;
    bool hasValue;
    mutex mtx;
    condition_variable cv;
public:
    Future1() : hasValue(false) {}

    // prevent the call to get() from seeing an uninitialized value
    // by acquiring the lock, setting the value, and notifying all
    // waiting threads before releasing the lock, the waiting
    // threads are guaranteed to see the updated value
    void set1(T v) {
        unique_lock <mutex> lck(mtx); // statement 1
        val = v; // statement 2
        hasValue = true; // statement 3
        cv.notify_all(); // statement 4
    }

    // you cannot notify without a lock
    // hasValue is modified after notifying,
    // but it doesn't matter since the lock
    // is released after getting out of scope
    void set2(T v) {
        unique_lock <mutex> lck(mtx); // statement 1
        cv.notify_all(); // statement 2
        hasValue = true; // statement 3
        val = v; // statement 4
    }

    T get() {
        unique_lock <mutex> lck(mtx);
        while (!hasValue) {
            cv.wait(lck);
        }
        return val;
    }
};

/// First issue same as in Future1
/// ISSUE: a call to get() can return an uninitialized value if simultaneous with the call to set()
/// ANSWER: if you reach line "hasValue = true;" in set() and then get() is executed, it will not enter the while
/// loop and it will return an uninitialized value
template<typename T>
class Future2 {
    T val;
    bool hasValue;
    mutex mtx;
    condition_variable cv;
public:
    Future2() : hasValue(false) {}

    void set(T v) {
        unique_lock <mutex> lck(mtx);
        cv.notify_all();
        hasValue = true;
        val = v;
    }

    T get() {
        // no guard for the hasValue,
        // it will see it as true and
        // will return val which
        // is not defined at this point
        unique_lock <mutex> lck(mtx);
        while (!hasValue) {
            // unique_lock<mutex> lck(mtx); - ISSUE
            cv.wait(lck);
        }
        return val;
    }
};

/// ISSUE: simultaneous calls to addContinuation() and set() may lead to continuations that are never executed;
/// ANSWER: It is possible to check hasValue in the if inside addContinuation and to see that it is false, and
/// in the same time set will make it true and empty the list, and then addContinuation adds a function that
/// will never be executed.
template<typename T>
class Future3 {
    list <function<void(T)>> continuations;
    T val;
    bool hasValue;
    mutex mtx;
public:
    Future3() : hasValue(false) {}

    void set(T v) {
        unique_lock <mutex> lck(mtx);
        hasValue = true;
        val = v;
        // lck.unlock(); - ISSUE
        for (function<void(T)> &f: continuations) {
            f(v);
        }
        // ensure that if addContinuation() locks the mutex
        // and thus it runs all the way and then set() will
        // not run until addContinuation() finishes
        lck.unlock(); // FIX
        continuations.clear();
    }

    void addContinuation(function<void(T)> f) {
        // set() function we explicitly release the
        // lock after all the operations
        unique_lock <mutex> lck(mtx); // FIX
        if (hasValue) {
            f(val);
        } else {
            // unique_lock<mutex> lck(mtx); - ISSUE
            continuations.push_back(f);
        }
    }
};

/// ISSUE: simultaneous calls to addContinuation() and set() may lead to
/// addContinuation executing the function on an uninitialized value.
/// ANSWER: It is possible that set will make it hasValue true, then
/// addContinuation acquires the lock and enters the if block,
/// executing the function on an uninitialized value.
template<typename T>
class Future4 {
    list <function<void(T)>> continuations;
    T val;
    bool hasValue;
    mutex mtx;
public:
    Future4() : hasValue(false) {}

    void set(T v) {
        unique_lock <mutex> lck(mtx); // FIX
        hasValue = true;
        val = v;
        // unique_lock<mutex> lck(mtx); - ISSUE
        for (function<void(T)> &f: continuations) {
            f(v);
        }
        // ensure that if addContinuation() locks the mutex
        // and thus it runs all the way and then set() will
        // not run until addContinuation() finishes
        lck.unlock(); // FIX
        continuations.clear();
    }

    void addContinuation(function<void(T)> f) {
        unique_lock <mutex> lck(mtx);
        if (hasValue) {
            // lck.unlock(); - ISSUE
            f(val);
        } else {
            continuations.push_back(f);
        }
    }
};

/// ISSUE: two simultaneous calls to addContinuation() may lead to continuations that are never executed;
/// ANSWER: We can have the following situation: addContinuation() and set() are executed simultaneously
///	addContinuation() reaches line ( } else { ) at the same time, set() reaches its end
///	addContinuation() goes on and adds a new f to the list, which will not get executed since set() is done
///	=> continuation that is never executed
template<typename T>
class Future5 {
    list <function<void(T)>> continuations;
    T val;
    bool hasValue;
    mutex mtx;
public:
    Future5() : hasValue(false) {}

    void set(T v) {
        hasValue = true;
        val = v;
        // unique_lock<mutex> lck(mtx); - ISSUE
        for (function<void(T)> &f: continuations) {
            // we need to make setting or checking of hasValue
            // atomic with the corresponding operation on the
            // continuations vector so, we need to lock the
            // mutex before setting or checking hasValue
            unique_lock <mutex> lck(mtx); // FIX
            f(v);
        }
        continuations.clear();
    }

    void addContinuation(function<void(T)> f) {
        unique_lock <mutex> lck(mtx); // FIX
        if (hasValue) {
            f(val);
        } else {
            // unique_lock<mutex> lck(mtx); - ISSUE
            continuations.push_back(f);
        }
    }
};

/// ISSUE: the work items are never executed in parallel
/// ANSWER: wi() is in lock => two threads can't reach there at the same time;
class ThreadPool1 {
    condition_variable cv;
    mutex mtx;
    list <function<void()>> work;
    vector <thread> threads;
    bool closed = false;

    void run() {
        unique_lock <mutex> lck(mtx);
        while (true) {
            if (!work.empty()) {
                function<void()> wi = work.front();
                work.pop_front();
                // by unlocking just before doing the work
                // and trying to lock after the work has been
                // done, we ensure that we also allow other
                // threads to take up some work and thus splitting
                // the work among threads.
                lck.unlock(); // FIX
                wi();
                lck.lock(); // FIX
            } else if (closed) {
                return;
            } else {
                cv.wait(lck);
            }
        }
    }

public:
    explicit ThreadPool1(int n) {
        threads.reserve(n);
        for (int i = 0; i < n; ++i) {
            threads.emplace_back([this]() { run(); });
        }
    }

    void enqueue(function<void()> f) {
        unique_lock <mutex> lck(mtx);
        work.push_back(f);
        cv.notify_one();
    }

    void close() {
        unique_lock <mutex> lck(mtx);
        closed = true;
        cv.notify_all();
        lck.unlock();
        for (thread &th: threads) th.join();
    }
};

/// ISSUE: close() may deadlock
/// ANSWER: threads are waiting on the mutex to be unlocked and if we don't unlock it, they will never join
/// => deadlock in close()
class ThreadPool2 {
    condition_variable cv;
    mutex mtx;
    list <function<void()>> work;
    vector <thread> threads;
    bool closed = false;

    void run() {
        unique_lock <mutex> lck(mtx);
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
    explicit ThreadPool2(int n) {
        threads.reserve(n);
        for (int i = 0; i < n; ++i) {
            threads.emplace_back([this]() { run(); });
        }
    }

    void enqueue(function<void()> f) {
        unique_lock <mutex> lck(mtx);
        work.push_back(f);
        cv.notify_one();
    }

    void close() {
        unique_lock <mutex> lck(mtx);
        closed = true;
        cv.notify_all();
        // we need to unlock the mutex before joining the threads
        // because the threads are waiting on the mutex to be unlocked
        // and if we don't unlock it, they will never join
        lck.unlock(); // FIX
        for (thread &th: threads) th.join();
    }
};

/// ISSUE: a single call to wait() can wait forever if simultaneous with the last call to done()
/// ANSWER: Let’s say we have two threads, one that calls wait() and one that calls done().
/// The thread that calls wait() will acquire the lock and then wait on the condition variable.
/// The thread that calls done() will acquire the lock, decrement the count and then notify
/// the waiting thread. The waiting thread will wake up, but it will not be able to acquire
/// the lock because the other thread has it, and it will wait forever.
/// ISSUE: simultaneous multiple calls to wait() and done() cause some wait()s wait forever
/// ANSWER: same as above, but with multiple threads calling wait() and done()
/// ISSUE: multiple calls to wait() can wait forever if called before done()
/// ANSWER: same as above
template<typename T>
class CountdownEvent {
    atomic<unsigned> count;
    mutex mtx;
    condition_variable cv;

public:
    explicit CountdownEvent(unsigned cnt) : count(cnt) {}

    void done() {
        unique_lock <mutex> lck(mtx); // FIX
        unsigned old = count.fetch_sub(1);
        if (old == 1) {
            // notify all waiting threads when count reaches zero
            // cv.notify_one(); - ISSUE
            cv.notify_all(); // FIX
        }
        // unlock the mutex after notifying
        // cv.wait(lck) unlocks the mutex but
        // locks the thread until notified
        lck.unlock(); // FIX
    }

    T wait() {
        if (count == 0) return;
        unique_lock <mutex> lck(mtx);
        while (count > 0) {
            cv.wait(lck); // Wait until the count reaches zero
        }
    }
};