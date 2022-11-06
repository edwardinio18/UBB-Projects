import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def subStr(s, n, m):
    res = ""
    while m >= 0:
        res += s[n]
        n += 1
        m -= 1
    return res


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    str = pickle.loads(cs.recv(256))
    n = pickle.loads(cs.recv(256))
    m = pickle.loads(cs.recv(256))

    res = subStr(str, n, m)

    cs.send(pickle.dumps(res))
    
    cs.close()

if __name__ == "__main__":
    main()