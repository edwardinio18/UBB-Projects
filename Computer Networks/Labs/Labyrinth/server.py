import socket, pickle
from threading import Thread

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)

clients = list()
indices = list()

map =   [
         ['0','0','X','X','X','X'],
         ['X','0','X','X','X','X'],
         ['X','0','X','0','0','0'],
         ['X','0','X','0','X','X'],
         ['X','0','0','0','X','X'],
         ['X','X','X','X','X','X']
        ]

def game(client):
    if not client in clients:
        clients.append(client)
        indices.append([0, 0])
    clIdx = clients.index(client)
    client.send(pickle.dumps(indices[clIdx]))
    
    

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
s.bind(ADDR)
s.listen(5)

while True:
    client, _ = s.accept()
    t = Thread(target=game, args=(client,))
    t.start()