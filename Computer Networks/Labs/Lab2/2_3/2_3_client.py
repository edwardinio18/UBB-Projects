import socket, pickle, random

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

n = random.uniform(0, 100)
n = round(n, 2)

s.send(pickle.dumps(n))

data = s.recv(128)
print(data)

s.close()