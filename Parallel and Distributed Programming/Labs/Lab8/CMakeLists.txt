cmake_minimum_required(VERSION 3.27)
project(Lab8)

set(CMAKE_CXX_STANDARD 23)

add_executable(Lab8 main.cpp
        DSM.cpp
        DSM.h
        Variable.cpp
        Variable.h
        Globals.cpp
        Globals.h
        Mpi_comms.cpp
        Mpi_comms.h
        Utils.h
)
