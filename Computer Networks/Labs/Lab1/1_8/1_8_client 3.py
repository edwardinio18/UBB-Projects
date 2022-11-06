import socket
import pickle
import time

HOST = "10.211.55.3"
IP = 7777
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)

    a = [1, 2, 3, 4]
    b = [1, 6, 5, 6, 7, 9, 3]

    s.send(pickle.dumps(a))
    time.sleep(0.1)
    s.send(pickle.dumps(b))

    data = pickle.loads(s.recv(256))
    print(data)

    s.close()

if __name__ == "__main__":
    main()