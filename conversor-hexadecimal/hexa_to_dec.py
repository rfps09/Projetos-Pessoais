import os
clear = lambda: os.system('cls' if os.name == 'nt' else 'clear')

def calculo (i, tam,num):
    aux = 0
    if i+1 == tam:
        aux = ( ( ( tam - i ) * 1 ) * num )
    else:
        aux =  num * 16
        for x in range (2,tam-i):
            aux = aux * 16
    return aux

validacao = 1

while validacao != 0:
    clear()

    resultado = 0

    hexa = str (input ("Insira um numero em hexa-decimal: "))

    tam = len(hexa)

    for i in range (0,tam):
        if ord(hexa[i]) == 48:
            resultado = resultado + calculo(i,tam,0)

        elif ord(hexa[i]) == 49:
            resultado = resultado + calculo(i,tam,1)

        elif ord(hexa[i]) == 50:
            resultado = resultado + calculo(i,tam,2)
        
        elif ord(hexa[i]) == 51:
            resultado = resultado + calculo(i,tam,3)

        elif ord(hexa[i]) == 52:
            resultado = resultado + calculo(i,tam,4)

        elif ord(hexa[i]) == 53:
            resultado = resultado + calculo(i,tam,5)
        
        elif ord(hexa[i]) == 54:
            resultado = resultado + calculo(i,tam,6)

        elif ord(hexa[i]) == 55:
            resultado = resultado + calculo(i,tam,7)
        
        elif ord(hexa[i]) == 56:
            resultado = resultado + calculo(i,tam,8)
        
        elif ord(hexa[i]) == 57:
            resultado = resultado + calculo(i,tam,9)

        elif ord(hexa[i]) == 97 or hexa[i] == 65:
            resultado = resultado + calculo(i,tam,10)
        
        elif ord(hexa[i]) == 98 or hexa[i] == 66:
            resultado = resultado + calculo(i,tam,11)

        elif ord(hexa[i]) == 99 or hexa[i] == 67:
            resultado = resultado + calculo(i,tam,12)
        
        elif ord(hexa[i]) == 100 or hexa[i] == 68:
            resultado = resultado + calculo(i,tam,13)

        elif ord(hexa[i]) == 101 or hexa[i] == 69:
            resultado = resultado + calculo(i,tam,14)

        elif ord(hexa[i]) == 102 or hexa[i] == 70:
            resultado = resultado + calculo(i,tam,15)

        else:
            print ("\nNúmero Inválido\n")
            break

    else:
        print ("\nO numero inserido em decimal: ",resultado,"\n")
        
    validacao = int (input ("\nInsira:\n1 - Continuar\n0 - Sair\n"))
