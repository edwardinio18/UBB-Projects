import pickle
import socket

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

def directionsMenu(pos):
    if MAP[i][j] == 'X':
        return -1

MAP =   [
         ['0','0','X','X','X','X'],
         ['X','0','X','X','X','X'],
         ['X','0','X','0','0','0'],
         ['X','0','X','0','X','X'],
         ['X','0','0','0','X','X'],
         ['X','X','X','X','X','X']
        ]
i, j = None

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

print("\nWelcome to the maze of mystery!\n")
print("\nYou are at the starting point now")
print("You can go up, down, left or right [u, d, l, r]\n")

pos = pickle.loads(s.recv(256))
i = pos[0]
j = pos[1]
while True:
    