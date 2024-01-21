#pragma once

#include <iostream>
#include <vector>
#include <random>
#include <stdexcept>

class Matrix {
private:
    int rows_;
    int columns_;
    std::vector<std::vector<int>> matrix_;
    const int MAX_INITIAL_VALUE = 100;
    const int MIN_INITIAL_VALUE = 10;

public:
    Matrix(int rows, int columns) : rows_(rows), columns_(columns) {
        this->matrix_ = std::vector<std::vector<int>>(rows, std::vector<int>(columns, 0));
    }

    // Fill the matrix with random values
    void fillMatrixRandomly() {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<int> distribution(MIN_INITIAL_VALUE, MAX_INITIAL_VALUE);

        for (int i = 0; i < this->rows_; i++) {
            for (int j = 0; j < this->columns_; j++) {
                this->matrix_[i][j] = distribution(gen);
            }
        }
    }

    // Get the number of rows in the matrix
    int getRows() const {
        return this->rows_;
    }

    // Get the number of columns in the matrix
    int getColumns() const {
        return this->columns_;
    }

    // Get the element at a specific position in the matrix
    int getElementOnPosition(int x, int y) const {
        if (x < 0 || x >= this->rows_ || y < 0 || y >= this->columns_) {
            throw std::out_of_range("Invalid coordinates");
        }
        return this->matrix_[x][y];
    }

    // Set the element at a specific position in the matrix
    void setElementOnPosition(int x, int y, int newValue) {
        if (x < 0 || x >= this->rows_ || y < 0 || y >= this->columns_) {
            throw std::out_of_range("Invalid coordinates");
        }
        this->matrix_[x][y] = newValue;
    }

    // Overload the << operator to print the matrix
    friend std::ostream &operator<<(std::ostream &os, const Matrix &matrix) {
        for (int i = 0; i < matrix.rows_; i++) {
            for (int j = 0; j < matrix.columns_; j++) {
                os << matrix.matrix_[i][j] << ' ';
            }
            os << '\n';
        }
        return os;
    }
};