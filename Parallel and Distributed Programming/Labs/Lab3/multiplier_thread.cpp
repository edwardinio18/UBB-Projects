#pragma once

#include "matrix.cpp"

class MultiplierThread {
private:
    const Matrix &m1_;
    const Matrix &m2_;
    Matrix &result_;
    int startRow_;
    int startColumn_;
    int positions_;

    // Compute the product of two matrix positions
    void computeProductOnPosition(int x, int y) {
        int sum = 0;
        for (int c = 0; c < this->m1_.getColumns(); c++) {
            sum += this->m1_.getElementOnPosition(x, c) * this->m2_.getElementOnPosition(c, y);
        }
        this->result_.setElementOnPosition(x, y, sum);
    }

public:
    MultiplierThread(const Matrix &m1, const Matrix &m2, Matrix &result, int startRow, int startColumn, int positions)
            : m1_(m1), m2_(m2), result_(result), startRow_(startRow), startColumn_(startColumn),
              positions_(positions) {}

    // Overload the () operator to define the thread's execution
    void operator()() {
        int currentRow = this->startRow_;
        int currentColumn = this->startColumn_;
        for (int pos = 0; pos < this->positions_; pos++) {
            computeProductOnPosition(currentRow, currentColumn);

            currentColumn++;
            if (currentColumn >= this->result_.getColumns()) {
                currentColumn = 0;
                currentRow++;
            }
        }
    }
};