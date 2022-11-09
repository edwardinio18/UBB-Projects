import socket, pickle
from time import sleep

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

matrix = [[""]*3, [""]*3, [""]*3]

while True:
    i = input("Enter the row number: ")
    j = input("Enter the column number: ")
    matrix[int(i)][int(j)] = "X"
    print(matrix)
    
    s.send(pickle.dumps(int(i)))
    sleep(0.1)
    s.send(pickle.dumps(int(j)))

    iS = pickle.loads(s.recv(128))
    jS = pickle.loads(s.recv(128))
    
    matrix[iS][jS] = "O"
    print(matrix)