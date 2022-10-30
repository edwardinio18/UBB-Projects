import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def div(a):
    l = []
    for i in range(2, a // 2 + 1):
        if a % i == 0:
            l.append(i)
    return l

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    a = pickle.loads(cs.recv(256))
    res = div(a)
    print(res)
    
    cs.close()

if __name__ == "__main__":
    main()