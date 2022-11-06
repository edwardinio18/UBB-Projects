import socket
import pickle

HOST = "0.0.0.0"
IP = 7777
ADDR = (HOST, IP)

def mergeSort(s1, s2):
    s = list()
    i = j = 0
    
    while i < len(s1) and j < len(s2):
        if s1[i] < s2[j]:
            s.append(s1[i])
            i += 1
        elif s1[i] > s2[j]:
            s.append(s2[j])
            j += 1
        else:
            s.append(s1[i])
            s.append(s1[i])
            i += 1
            j += 1

    while i < len(s1):
        s.append(s1[i])
        i += 1
    while j < len(s2):
        s.append(s2[j])
        j += 1

    return s


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(ADDR)
    s.listen(5)
    cs, _ = s.accept()

    a = pickle.loads(cs.recv(256))
    b = pickle.loads(cs.recv(256))

    res = mergeSort(a, b)
    
    cs.send(pickle.dumps(res))

    cs.close()

if __name__ == "__main__":
    main()