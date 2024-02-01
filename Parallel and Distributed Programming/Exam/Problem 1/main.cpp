void mergeSort(int *v, int dataSize, int myId, int nrProc) {
    if (nrProc == 1) { // || dataSize <= 1 (A)
        mergeSortLocal(v, dataSize);
    } else {
        int halfLen = dataSize / 2;
        int halfProc = nrProc / 2;
        int child = myId + halfProc;
        MPI_Ssend(&halfLen, 1, MPI_INT, child, 1, MPI_COMM_WORLD);
        // halfProc => nrProc - halfProc (C, D)
        MPI_Ssend(&nrProc - halfProc, 1, MPI_INT, child, 2, MPI_COMM_WORLD);
        MPI_Ssend(v, halfLen, MPI_INT, child, 3, MPI_COMM_WORLD);
        // halfLen => dataSize - halfLen (B)
        mergeSort(v + halfLen, dataSize - halfLen, myId, nrProc - halfProc);
        MPI_Recv(v, halfLen, MPI_INT, child, 4, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        mergeParts(v, dataSize, halfLen);
    }
}

void worker1(int myId) {
    MPI_Status status;
    int dataSize, nrProc;
    MPI_Recv(&dataSize, 1, MPI_INT, MPI_ANY_SOURCE, 1, MPI_COMM_WORLD, &status);
    auto parent = status.MPI_SOURCE;
    MPI_Recv(&nrProc, 1, MPI_INT, parent, 2, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    std::vector v(dataSize);
    MPI_Recv(v.data(), dataSize, MPI_INT, parent, 3, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    mergeSort(v.data(), dataSize, myId, nrProc);
    MPI_Ssend(v.data(), dataSize, MPI_INT, parent, 4, MPI_COMM_WORLD);
}