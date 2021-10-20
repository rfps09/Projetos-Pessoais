function cpf() {
    var num = prompt("Insira um CPF com um digito faltando, igual ao exemplo", "x2345678909");
    var sum = 0;
    var validacao = 0;
    var eloPerdido = 0;
    var aux = 0;
    var count = 0;

    if(num[9] == 'x') {
        for(i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;
        for(i = 11; i > 2; i--) {
            sum += num[11-i]-'0';
        }
        sum+= validacao*2;
        num = num.replace("x",String.fromCharCode(validacao+48));
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[10] - '0')
            document.getElementById("showCPF").innerHTML = "CPF = " + num;
        else document.getElementById("showCPF").innerHTML = "CPF Invalido!!!";
    }
    else if(num[10] == 'x') {
        for(i = 10; i > 1; i--) {
            sum += (num[10-i]-'0') * i;
        }
        
        validacao = 11 - (sum % 11);
        validacao = validacao > 9 ? 0 : validacao;

        if(validacao == num[9]-'0') {
            for(i = 11; i > 2; i--) {
                sum += num[11-i]-'0';
            }
            sum+= (num[9]-'0') * 2;
            validacao = 11 - (sum%11);
            validacao = validacao > 9 ? 0 : validacao;
            num = num.replace("x",String.fromCharCode(validacao+48));
            document.getElementById("showCPF").innerHTML = "CPF = " + num;
        } else document.getElementById("showCPF").innerHTML = "CPF Invalido!!!";
    }
    else{
        for(i = 10; i > 1; i--) {
            console.log("teste");
            if(num[10-i] != 'x') {
                sum += (num[10-i]-'0') * i;
            }
            else {
                eloPerdido = i;
            }
        }
        
        for(i = 0; i < 10; i++) {
            aux = sum + i*eloPerdido;

            validacao = 11 - (aux % 11);
            validacao = validacao > 9 ? 0 : validacao;

            if(validacao == num[9]-'0') {
                for(j = 11; j > 1; j--) {
                    if(num[11-j] != 'x') {
                        aux += (num[11-j]-'0');
                    }
                }
                aux+=validacao+i;
                validacao = 11 - (aux%11);
                validacao = validacao > 9 ? 0 : validacao;
                if(validacao == num[10] - '0') {                    
                    num = num.replace("x",String.fromCharCode(i+48));
                    document.getElementById("showCPF").innerHTML = "CPF = " + num;
                }
                else count++;
            } else count++;
        }
        if(count > 9) document.getElementById("showCPF").innerHTML = "CPF Invalido!!!";
    }
    
    document.getElementById("main").style.display = "none";
    document.getElementById("ans").style.display = "block";
}

function validar() {
    var num = prompt("Insira um CPF no formato igual ao do exemplo", "12345678909");
    var sum = 0;
    var validacao = 0;

    for(i = 10; i > 1; i--) {
        sum += (num[10-i]-'0') * i;
    }
    
    validacao = 11 - (sum % 11);
    validacao = validacao > 9 ? 0 : validacao;

    if(validacao == num[9]-'0') {
        for(i = 11; i > 2; i--) {
            sum += num[11-i]-'0';
        }
        sum+= validacao * 2;
        validacao = 11 - (sum%11);
        validacao = validacao > 9 ? 0 : validacao;
        if(validacao == num[10] - '0') {
            document.getElementById("ans").style.color = "green";
            document.getElementById("showCPF").innerHTML = "CPF Valido!!!";
        }
        else {
            document.getElementById("ans").style.color = "red";
            document.getElementById("showCPF").innerHTML = "CPF Invalido!!!";
        }
    } else {
        document.getElementById("ans").style.color = "red";
        document.getElementById("showCPF").innerHTML = "CPF Invalido!!!";
    }

    document.getElementById("main").style.display = "none";
    document.getElementById("ans").style.display = "block";
    document.getElementById("ans").style.color = "snow";
}

function back() {
    document.getElementById("main").style.display = "block";
    document.getElementById("ans").style.display = "none";
}