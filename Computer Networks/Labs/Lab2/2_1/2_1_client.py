import socket, pickle

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)
cmd = input("Command: ")
if cmd == "":
    exit(0)
s.send(pickle.dumps(cmd))

data = s.recv(128)
print(pickle.loads(data))

s.close()