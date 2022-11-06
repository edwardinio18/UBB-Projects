import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def arrInter(a, b):
    l = []
    
    for i in range(len(a)):
        for j in range(len(b)):
            if a[i] == b[j]:
                l.append(a[i])

    return l


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    a = pickle.loads(cs.recv(256))
    b = pickle.loads(cs.recv(256))

    res = arrInter(a, b)

    cs.send(pickle.dumps(res))
    
    cs.close()

if __name__ == "__main__":
    main()