import socket, pickle

IP = "10.211.55.3"
PORT = 6666
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

str = "\\\Mac\Home\Documents\Year 2 - Sem 1\Computer Networks\Labs\Lab2\\2_2\\2_2_server.py"

s.send(pickle.dumps(str))

length = pickle.loads(s.recv(128))
content = pickle.loads(s.recv(3000))
if (length == -1):
    print("Length = -1; File does not exist; Exit code -1;")
else:
    file = str + "-copy"

    f = open(file, "w")
    f.write(content)
    f.close()


s.close()