import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def chInStr(s, c):
    l = []
    for i in range(len(s)):
        if s[i] == c:
            l.append(i)
    return l

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    str = pickle.loads(cs.recv(256))
    ch = pickle.loads(cs.recv(256))

    res = chInStr(str, ch)

    cs.send(pickle.dumps(res))
    
    cs.close()

if __name__ == "__main__":
    main()