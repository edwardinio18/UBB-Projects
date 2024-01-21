import socket
import pickle
import time

HOST = "10.211.55.3"
IP = 7777
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)

    a = "ksdhg isa khsadjkgksh sdg"
    b = "kqyfhdjsjak oqpwk ksiusyduwaiyvbg"

    s.send(pickle.dumps(a))
    time.sleep(0.1)
    s.send(pickle.dumps(b))

    ch, n = pickle.loads(s.recv(256))
    print(ch, n)

    s.close()

if __name__ == "__main__":
    main()