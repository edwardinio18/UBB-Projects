# 14. a. Determine the last element of a list.
# b. Delete elements from a list, from position n to m.

class Nod:
    def __init__(self, e):
        self.e = e
        self.urm = None
    
class Lista:
    def __init__(self):
        self.prim = None
        

'''
crearea unei liste din valori citite pana la 0
'''
def creareLista():
    lista = Lista()
    lista.prim = creareLista_rec()
    return lista

def creareLista_rec():
    x = int(input("x="))
    if x == 0:
        return None
    else:
        nod = Nod(x)
        nod.urm = creareLista_rec()
        return nod
    
'''
tiparirea elementelor unei liste
'''
def tipar(lista):
    tipar_rec(lista.prim)
    
def tipar_rec(nod):
    if nod != None:
        print (nod.e)
        tipar_rec(nod.urm)        

def ultimulElement(lista):
    ultimulElement_rec(lista.prim)

def ultimulElement_rec(nod):
    if nod.urm == None:
        print(nod.e)
    else:
        ultimulElement_rec(nod.urm)

def stergeDeLaNLaM(lista, n, m):
    return stergeDeLaNLaM_rec(lista.prim, n, m)

def stergeDeLaNLaM_rec(nod, n, m):
    if nod != None:
        if n == 0:
            if m == 0:
                return nod.e
            else:
                return stergeDeLaNLaM_rec(nod.urm, n, m-1)
        else:
            return stergeDeLaNLaM_rec(nod.urm, n-1, m-1)
    else:
        return None
    

'''
program pentru test
'''
        
def main():
    list = creareLista()
    a = stergeDeLaNLaM(list, 2, 3)
    print(a)
    
main() 
    
    
    
    
    