from ctypes.wintypes import INT
import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def highOcc(a, b):
    n = m = {}

    s1 = "".join(set(a))
    s2 = "".join(set(b))

    for i in range(len(s1)):
        n[s1[i]] = 0
    for i in range(len(s2)):
        m[s2[i]] = 0

    min = len(a) if len(a) < len(b) else len(b)

    for i in range(min):
        if a[i] == b[i]:
            n[a[i]] += 1

    max = -99999
    c = ""
    for i in n:
        if n[i] > max:
            max = n[i]
            c = i

    return c, max

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    a = pickle.loads(cs.recv(256))
    b = pickle.loads(cs.recv(256))

    ch, n = highOcc(a, b)

    cs.send(pickle.dumps((ch, n)))
    
    cs.close()

if __name__ == "__main__":
    main()