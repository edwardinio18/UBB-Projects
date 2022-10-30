import socket
import pickle
import time

HOST = "10.211.55.3"
IP = 7777
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)

    a = ['a', 'b', 'c']
    b = ['b', 'c', 'd']

    s.send(pickle.dumps(a))
    time.sleep(1)
    s.send(pickle.dumps(b))

    data = s.recv(256)
    print(pickle.loads(data))

    s.close()

if __name__ == "__main__":
    main()