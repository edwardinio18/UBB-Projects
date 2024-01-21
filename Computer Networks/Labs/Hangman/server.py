import socket, pickle
from threading import Thread
from time import sleep
import sys

IP = "0.0.0.0"
PORT = 7777
ADDR = (IP, PORT)
WORD = ""

clients = []

def find(s, ch):
    return [i for i, ltr in enumerate(s) if ltr == ch]

def game(client):
    tries = 10
    if not client in clients:
        clients.append(client)
    spaces = find(WORD, ' ')
    client.send(pickle.dumps((len(WORD), spaces)))
    while True:
        ch = client.recv(128)
        if not ch:
            exit(0)
        ch = pickle.loads(ch)
        if ch in WORD:
            indices = find(WORD, ch)
            client.send(pickle.dumps(1))
            sleep(0.1)
            client.send(pickle.dumps((indices, ch)))
        else:
            tries -= 1
            if tries == 0:
                client.send(pickle.dumps(-1))
                sleep(0.1)
                client.send(pickle.dumps(f'Game over! The secret word(s) was/were \'{WORD}\''))
                exit(0)
            else:
                client.send(pickle.dumps(0))
                sleep(0.1)
                client.send(pickle.dumps(f'{tries} tries left'))

    
WORD = input("Enter secret word(s): ")

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(ADDR)
s.listen(5)

while True:
    client, _ = s.accept()
    t = Thread(target=game, args=(client,))
    t.start()