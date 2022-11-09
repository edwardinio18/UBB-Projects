import socket, pickle

IP = "10.211.55.3"
PORT = 7777
ADDR = (IP, PORT)

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(ADDR)

print("\nWelcome to hangman")
print("5 wrong guesses and the game is over")
print("Good luck!\n")

wordLen, spaces = pickle.loads(s.recv(128))
letters = [""] * wordLen
for i in range(wordLen):
    for j in spaces:
        if i == j:
            print(" ", end="")
            break
    else:
        print("_ ", end="")
print("\n")

for i in range(len(letters)):
    for j in spaces:
        if i == j:
            letters[i] = " "

while True:
    ch = input("Guess a letter: ")
    s.send(pickle.dumps(ch))
    t = pickle.loads(s.recv(128))
    data = pickle.loads(s.recv(128))

    if t == -1:
        print(f'\n{data}')
        exit(0)
    elif t == 1:
        indices, ch = data
        if ch in letters:
            print(f'The letter {ch} has already been guessed, please choose a different letter!\n')
            for i in letters:
                if i == "":
                    print("_ ", end="")
                else:
                    print(f'{i} ', end="")
            print("\n")
        else:
            for c in range(wordLen):
                for i in indices:
                    if c == i:
                        letters[i] = ch
            for i in letters:
                if i == "":
                    print("_ ", end="")
                else:
                    print(f'{i} ', end="")
            print("\n")
            ok = 1
            for i in letters:
                if i == "":
                    ok = 0
            if ok:
                print("Congrats, you guessed the word(s)!")
                exit(0)
    elif t == 0:
        print(data)
        for i in letters:
            if i == "":
                print("_ ", end="")
            else:
                print(f'{i} ', end="")
        print("\n")