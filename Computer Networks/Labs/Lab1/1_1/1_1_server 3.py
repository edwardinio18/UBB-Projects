# Server returns the sum of the numbers.

import socket, pickle

IP = "0.0.0.0"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)
    cs, addr = s.accept()
    l = cs.recv(4096)
    l = pickle.loads(l)
    print(sum(l))
    cs.close()


if __name__ == "__main__":
    main()