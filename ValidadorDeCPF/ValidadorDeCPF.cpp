#include <iostream>
#include <string>

using namespace std;

int main() { 
    string num;
    int sum = 0;
    int validacao = 0;
    
    cin >> num;

    for(int i = 10; i > 1; i--) {
        sum += (num[10-i]-'0') * i;
    }
    
    validacao = 11 - (sum % 11);
    validacao > 9 ? validacao = 0 : validacao = validacao;

    if(validacao == num[9]-'0') {
        sum = 0;
        for(int i = 11; i > 1; i--) {
            sum += (num[11-i]-'0') * i;
        }

        validacao = 11 - (sum%11);
        validacao > 9 ? validacao = 0 : validacao = validacao;

        if(validacao == num[10] - '0')
            cout << "CPF Valido!!!" << endl;
        else cout << "CPF Invalido!!!" << endl;
    } else cout << "CPF Invalido!!!" << endl;

    return 0;
}
