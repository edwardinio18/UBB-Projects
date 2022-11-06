import socket
import pickle
import time

HOST = "10.211.55.3"
IP = 7777
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)

    str = "hai afara la tigara"
    n = 4
    m = 5

    s.send(pickle.dumps(str))
    time.sleep(0.1)
    s.send(pickle.dumps(n))
    time.sleep(0.1)
    s.send(pickle.dumps(m))

    data = pickle.loads(s.recv(256))
    print(data)

    s.close()

if __name__ == "__main__":
    main()