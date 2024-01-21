import socket

HOST = "10.211.55.3"
IP = 5555
ADDR = (HOST, IP)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(ADDR)
    str = "vr tigara"
    s.send(str.encode())
    d = s.recv(1024).decode()
    print("Server sent: ", d)
    s.close()

if __name__ == "__main__":
    main()