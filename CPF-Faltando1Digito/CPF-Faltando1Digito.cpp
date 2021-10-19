#include <iostream>
#include <string>

using namespace std;

int main() {
    ios::sync_with_stdio(0);

    freopen("entrada.txt", "r", stdin);
    freopen("saida.txt", "w", stdout);
    
    string num;
    int sum = 0;
    int validacao = 0;
    int eloPerdido = 0;
    int aux = 0;
    int count = 0;
    
    cin >> num;

    if(num[9] == 'x') {
        for(int i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        validacao = 11 - (sum % 11);
        validacao > 9 ? validacao = 0 : validacao = validacao;
        for(int i = 11; i > 2; i--) {
            sum += num[11-i]-'0';
        }
        sum+= validacao*2;
        num[9] = validacao + '0';
        validacao = 11 - (sum%11);
        validacao > 9 ? validacao = 0 : validacao = validacao;

        if(validacao == num[10] - '0')
            cout << num << endl;
        else cout << "CPF Invalido!!!" << endl;
    }
    else if(num[10] == 'x') {
        for(int i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        
        validacao = 11 - (sum % 11);
        validacao > 9 ? validacao = 0 : validacao = validacao;

        if(validacao == num[9]-'0') {
            for(int i = 11; i > 2; i--) {
                sum += num[11-i]-'0';
            }
            sum+= (num[9]-'0') * 2;
            validacao = 11 - (sum%11);
            validacao > 9 ? validacao = 0 : validacao = validacao;
            num[10] = validacao + '0';
            cout << num << endl;
        } else cout << "CPF Invalido!!!" << endl;
    }
    else{
        for(int i = 10; i > 1; i--) {
            if(num[10-i] != 'x') {
                sum += (num[10-i]-'0') * i;
            }
            else {
                eloPerdido = i;
            }
        }
        
        for(int i = 0; i < 10; i++) {
            aux = sum + i*eloPerdido;

            validacao = 11 - (aux % 11);
            validacao > 9 ? validacao = 0 : validacao = validacao;

            if(validacao == num[9]-'0') {
                for(int i = 11; i > 2; i--) {
                    if(num[11-i] != 'x') {
                        aux += (num[11-i]-'0');
                    }
                }
                aux+=validacao*2;
                aux+=i;
                validacao = 11 - (aux%11);
                validacao > 9 ? validacao = 0 : validacao = validacao;
                if(validacao == num[10] - '0') {                    
                    num[10-eloPerdido] = i +'0';
                    cout << num << endl;
                }
                else count++;
            } else count++;
        }
        if(count > 9) cout << "CPF Invalido!!!" << endl;
    }

    fclose(stdin);
    fclose(stdout);

    return 0;
}
