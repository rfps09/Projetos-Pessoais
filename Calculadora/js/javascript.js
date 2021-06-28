var num = "";
var aux = "";
var op = "";

document.addEventListener('keyup', (event) => {
    if(event.key == "0") {
        funcao("0");
    }

    else if(event.key == "1") {
        document.getElementById("um").click();
    }

    else if(event.key == "2") {
        document.getElementById("dois").click();
    }

    else if(event.key == "3") {
        document.getElementById("tres").click();
    }

    else if(event.key == "4") {
        document.getElementById("quatro").click();
    }

    else if(event.key == "5") {
        document.getElementById("cinco").click();
    }

    else if(event.key == "6") {
        document.getElementById("seis").click();
    }

    else if(event.key == "7") {
        document.getElementById("sete").click();
    }

    else if(event.key == "8") {
        document.getElementById("oito").click();
    }

    else if(event.key == "9") {
        document.getElementById("nove").click();
    }

    else if(event.key == "*" || event.key == "x") {
        document.getElementById("multiplicacao").click();
    }

    else if(event.key == "/") {
        document.getElementById("divisao").click();
    }

    else if(event.key == "-") {
        document.getElementById("subtracao").click();
    }

    else if(event.key == "+") {
        document.getElementById("soma").click();
    }

    else if(event.key == "%") {
        document.getElementById("porcentagem").click();
    }

    else if (event.key == "Backspace") {
        document.getElementById("apagar").click();
    }

    else if (event.key == "=" || event.key == "Enter") {
        document.getElementById("result").click();
    }

    else if (event.key == "c" || event.key == "Delete") {
        document.getElementById("blackhole").click();
    }

    else if (event.key == ".") {
        document.getElementById("ponto").click();
    }

    else if (event.key == "Control") {
        document.getElementById("sinal").click();
    }
});

function tamanho(a) {
    if (a.length <= 7) {
        document.getElementById("resultado-display").style.fontSize = "70px";
    }

    else if (a.length > 7 && a.length <= 16) {
        document.getElementById("resultado-display").style.fontSize = "35px";
    }

    else if (a.length > 16 && a.length <= 24) {
        document.getElementById("resultado-display").style.fontSize = "25px";
    }

    else if (a.length > 24) {
        document.getElementById("resultado-display").style.fontSize = "20px";
    }
}

function funcao(x) {
    if (x != "." && num.length < 16) {
        num = num + x.toString();
        tamanho(num);
        document.getElementById("resultado").innerHTML = num;
    }
    else if (x == "." && num != "") {
        var teste = false;

        for (let i = 0; i < num.length; i++) {
            if (num[i] == ".") {
                teste = true;
            }
        }

        if (teste != true) {
            num = num + ".";
            tamanho(num);
            document.getElementById("resultado").innerHTML = num;
        }
    }
    document.getElementById("resultado-teste").style.display = "none"
}

function funcaoOP(y) {
    if (op == "" && num != "") {
        aux = num;
        op = y;
        tamanho(num);
        document.getElementById("resultado").innerHTML = aux + op;
        num = "";
    }
    else if (op != "" || num != "") {
        op = y;
        tamanho(num);
        document.getElementById("resultado").innerHTML = aux + op;
    }
    document.getElementById("resultado-teste").style.display = "none"
}

function sinal () {
    if (num != "" && num[0] != "-") {
        num = "-" + num;
        tamanho(num);
        document.getElementById("resultado").innerHTML = num;
    }
    else if (num != "" && num[0] == "-") {
        num = num.substr(1,parseInt(num.length));
        tamanho(num);
        document.getElementById("resultado").innerHTML = num;
    }
    document.getElementById("resultado-teste").style.display = "none"
}

function blackhole() {
    num="";
    aux = "";
    op = "";
    tamanho(num);
    document.getElementById("resultado").innerHTML = "0";
    document.getElementById("resultado-teste").style.display = "none"
}

function porcentagem() {
    if (num != "") {
        num = parseFloat(num) / 100;
        num = num.toString();
        tamanho(num);
        document.getElementById("resultado").innerHTML = num;
        document.getElementById("resultado-teste").style.display = "block"
    }
}

function apagar() {
    if(num != "") {
        tam = num.length;
        num = num.substr(0,parseInt(tam)-1);
        tamanho(num);
        if (num != "") {
            document.getElementById("resultado").innerHTML = num;
        }
        else {
            document.getElementById("resultado").innerHTML = "0";
        }
    }
    document.getElementById("resultado-teste").style.display = "none"
}

function resultado() {
    if (num != "" && aux != "") {
        var numero = parseFloat(num);
        var auxiliar = parseFloat(aux);
        var resultado = 0.0;

        if (op == "+") {
            resultado = auxiliar + numero;    
        }
        else if (op == "-") {
            resultado = auxiliar - numero;    
        }
        else if (op == "x") {
            resultado = auxiliar * numero;    
        }
        else if (op == "/") {
            resultado = auxiliar / numero;    
        }

        num = resultado.toString();

        tamanho(num);

        document.getElementById("resultado").innerHTML = num;

        aux = "";
        op = "";

        document.getElementById("resultado-teste").style.display = "block"
    }
}