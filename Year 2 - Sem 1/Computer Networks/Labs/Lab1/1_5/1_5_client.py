import socket
import pickle
import time

HOST = "10.211.55.3"
IP = 7777
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)

    a = 20

    s.send(pickle.dumps(a))

    s.close()

if __name__ == "__main__":
    main()