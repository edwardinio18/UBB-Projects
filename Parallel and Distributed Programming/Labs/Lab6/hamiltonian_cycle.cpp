#include <iostream>
#include <fstream>
#include <vector>
#include <future>
#include <mutex>
#include <filesystem>

using namespace std;
namespace fs = std::__fs::filesystem;

std::mutex mtx;
clock_t t;

int countFilesInDir(const fs::path &path) {
    int file_count = 0;
    for (const auto &entry: fs::directory_iterator(path)) {
        ++file_count;
    }
    return file_count;
}

void readGraph(const string &filename, vector<vector<bool>> &graph) {
    ifstream fin(filename);

    int V, temp;
    fin >> V;

    graph.resize(V, vector<bool>(V));

    for (int i = 0; i < V; ++i) {
        for (int j = 0; j < V; j++) {
            fin >> temp;
            graph[i][j] = temp != 0;
        }
    }

    fin.close();
}

bool isSafe(int v, const vector<vector<bool>> &graph, const vector<int> &path, int pos) {
    if (!graph[path[pos - 1]][v]) // Check if this vertex is an adjacent vertex of the previously added vertex.
        return false;
    for (int i = 0; i < pos; i++) {
        if (path[i] == v) { // Check if the vertex has already been included.
            return false;
        }
    }
    return true;
}

vector<int> hamCycleUtil(const vector<vector<bool>> &graph, vector<int> path, int pos) {
    int V = graph.size();
    if (pos == V) { // Base case: If all vertices are included in Hamiltonian Cycle
        if (graph[path[pos - 1]][path[0]]) // If there is an edge from the last included vertex to the first vertex
            return path;
        else
            return {};
    }

    vector<future<vector<int>>> futures;

    for (int v = 1; v < V; v++) { // Try different vertices as a next candidate in Hamiltonian Cycle.
        if (isSafe(v, graph, path, pos)) { // Check if this vertex can be added
            vector<int> newPath = path; // Add v to path
            newPath[pos] = v;

            // Create a new thread for each recursive call
            futures.push_back(async(launch::async, hamCycleUtil, cref(graph), newPath, pos + 1));
        }
    }

    for (auto &future: futures) { // Wait for all threads to finish
        vector<int> result = future.get(); // Get the result from each thread
        if (!result.empty()) // If a thread found a Hamiltonian Cycle, return it
            return result;
    }

    return {};
}

void findHamiltonianCycle(const vector<vector<bool>> &graph, int start_vertex) {
    int V = graph.size();
    vector<int> path(V, -1);
    path[0] = start_vertex;

    vector<int> result_path = hamCycleUtil(graph, path, 1);
    lock_guard<mutex> lock(mtx);
    if (result_path.empty()) {
        cout << "No Hamiltonian Cycle found." << endl;
    } else {
        cout << "Hamiltonian Cycle found starting from vertex " << start_vertex << ": ";
        for (int vertex: result_path)
            cout << vertex + 1 << " ";
        cout << result_path[0] + 1 << endl;
    }

    cout << "Time taken: " << (double) (clock() - t) / CLOCKS_PER_SEC << " seconds" << endl;
}

int main() {
    for (int i = 0; i < countFilesInDir(fs::current_path() / "input") - 1; ++i) {
        vector<vector<bool>> graph;
        readGraph(fs::current_path() / "input" / (to_string(i) + ".in"), graph);

        cout << "Reading graph from input/" << i << ".in\n";

        t = clock();

        findHamiltonianCycle(graph, 0);

        cout << '\n';
    }

    return 0;
}