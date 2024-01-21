from ctypes import addressof
import socket
from array import *
import pickle

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)
    arr = [1, 2, 3]
    data_string = pickle.dumps(arr)
    s.send(data_string)
    while True:
        data = s.recv(1024)
        if not data:
            break
        if (s.sendto(pickle.dumps(arr), ADDR)):
            print("sent")
    s.close()


if __name__ == "__main__":
    main()