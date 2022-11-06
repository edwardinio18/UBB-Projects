import socket
from threading import *

host = "10.211.55.3"
port = 5555

def reverse(s):
    s = list(s)
    s.reverse()
    return "".join(s)

class client(Thread):
    def __init__(self, socket, address):
        Thread.__init__(self)
        self.sock = socket
        self.addr = address
        self.start()

    def run(self):
        d = self.sock.recv(1024).decode()
        print("Client sent:", d)
        self.sock.send(reverse(d).encode())


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((host, port))
    s.listen(5)
    cs, addr = s.accept()
    client(cs, addr)
    s.close()

if __name__ == "__main__":
    main()