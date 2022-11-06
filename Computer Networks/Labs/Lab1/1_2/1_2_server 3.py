import socket, pickle

IP = "0.0.0.0"
PORT = 7777


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((IP, PORT))
    s.listen(5)
    cs, addr = s.accept()
    res = cs.recv(4096)
    res = pickle.loads(res)
    n = 0
    for i in res:
        if i == " ":
            n += 1
    print(n)
    cs.close()

if __name__ == "__main__":
    main()