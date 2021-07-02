var num = "";
var aux = "";
var op = "";
var mrc = "";
var alt = false;
var ce = true;

function tamanho(a,b) {
    if (a.length < 12) {
        document.getElementById("resultado").style.fontSize = "85px";
        document.getElementById("resultado").innerHTML = b;
    }
    else if (a.length > 11 && a.length < 16) {
        document.getElementById("resultado").style.fontSize = "64px";
        document.getElementById("resultado").innerHTML = b;
    }
    else if (a.length > 15 && a.length < 26) {
        document.getElementById("resultado").style.fontSize = "40px";
        document.getElementById("resultado").innerHTML = b;
    }
    else if (a.length > 25) {
        document.getElementById("resultado").style.fontSize = "30px";
        document.getElementById("resultado").innerHTML = b;
    }
}

function numero(x) {
    if (x != "." && num.length < 15 && ce == true) {
        num = num + x.toString();
        tamanho(num,num);
        document.getElementById("resultado").style.animation = "none";
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
    else if (x == "." && num != "" && ce == true) {
        var teste = false;

        for (let i = 0; i < num.length; i++) {
            if (num[i] == ".") {
                teste = true;
            }
        }

        if (teste != true) {
            num = num + ".";
            tamanho(num, num);
        }
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
    else if (x != "." && num.length < 15 && ce == false)  {
        blackhole();
        num = num + x.toString();
        tamanho(num, num);
        document.getElementById("resultado").style.animation = "none";
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
}

function funcaoOP(y) {
    if (op == "" && num != "") {
        aux = num;
        op = y;
        if (op == "%") {
            resultado();
        }
        else if (op == "raiz") {
            resultado();
        }
        else {
            tamanho(aux, aux+op);
            num = "";
            document.getElementById("resultado-teste").style.display = "none"
            ce = true;
        }
        alt = false;
    }
    else if (op != "" && num != "") {
        resultado(y);
    }
}

function sinal () {
    if (num != "" && num[0] != "-" && ce == true) {
        num = "-" + num;
        tamanho(num, num);
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
    else if (num != "" && num[0] == "-" && ce == true) {
        num = num.substr(1,parseInt(num.length));
        tamanho(num, num);
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
}

function apagar() {
    if(num != "" && ce == true) {
        tam = num.length;
        num = num.substr(0,parseInt(tam)-1);
        if (num != "") {
            tamanho(num, num);
            document.getElementById("resultado").style.animation = "none";
        }
        else {
            tamanho(num, "|");
            document.getElementById("resultado").style.animation = "piscando 1s infinite";
        }
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
    }
}

function blackhole() {
    num="";
    aux = "";
    op = "";
    tamanho(num, "|");
    document.getElementById("resultado-teste").style.display = "none"
    document.getElementById("resultado").style.animation = "piscando 1s infinite";
    alt = false;
    ce = true;
}

function resultado(o) {
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
        else if (op == '^') {
            if (numero > 0) { 
                resultado = auxiliar;
                for (let i = 1; i < numero; i++) {
                    resultado *= auxiliar;
                }
            }
            else if (numero < 0) {
                resultado = auxiliar;
                for (let i = 1; i < numero * -1; i++) {
                    resultado *= auxiliar;
                }
                resultado = 1 / resultado;
            }
            else {
                resultado = 1;
            }
        }
        else if (op == '%') {
            resultado = parseFloat(num) / 100;
        }

        else if (op == 'raiz') {
            resultado = Math.sqrt(parseFloat(num));
        }



        if (op == "/" && numero == 0) {
            num = "Não é possível dividir por zero";
            tamanho(num, num);
            num = "";
            op = "";
            aux = "";
            ce = false;
        }
        else if (typeof(o) != "undefined") {
            num = resultado.toString();
            tamanho(num, num + o);
            op = "";
            aux = "";
            ce = true;
            funcaoOP(o);
        }
        else {
            num = resultado.toString();
            tamanho(num, num);
            op = "";
            aux = "";
            ce = false;
        }

        document.getElementById("resultado-teste").style.display = "block"
        alt = false;
    }
}

function mrcMemorie() {
    if (mrc != "" && alt == false) {
        num =  mrc;
        tamanho(num,num);
        document.getElementById("resultado").style.animation = "none";
        document.getElementById("resultado-teste").style.display = "none"
        alt = true;
        ce = false;
    }
    else if (mrc != "" && alt == true) {
        mrc = "";
        tamanho(num,"|");
        document.getElementById("resultado").style.animation = "piscando 1s infinite";
        num = "";
        document.getElementById("resultado-teste").style.display = "none"
        mrcTeste()
        ce = true;
    }
}

function mMais() {
    if (num != "") {
        mrc = num;
        tamanho(num,"|");
        document.getElementById("resultado").style.animation = "piscando 1s infinite";
        num = "";
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
        ce = true;
        mrcTeste();
    }
}

function mrcTeste() {
    if (mrc != "") {
        document.getElementById("mrc-teste").style.display = "block"
        document.getElementById("resultado").style.lineHeight = "25px"
        document.getElementById("resultado-teste").style.marginTop = "-6px"
    }
    else {
        document.getElementById("mrc-teste").style.display = "none"
        document.getElementById("resultado").style.lineHeight = "70px"
        document.getElementById("resultado-teste").style.marginTop = "-10px"
    }
}

function mMenos() {
    if (num != "" && mrc != "") {
        var resultado;
        resultado = parseFloat(mrc) - parseFloat(num);
        if (resultado == 0) {
            mrc = "";
        }
        else {
            mrc = resultado.toString();
        }
        tamanho(num,"|");
        document.getElementById("resultado").style.animation = "piscando 1s infinite";
        num = "";
        document.getElementById("resultado-teste").style.display = "none"
        alt = false;
        ce = true;
        mrcTeste()
    }
}

document.addEventListener('keyup', (event) => {
    if(event.key == "0") {
        document.getElementById("zero").click();
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
    else if (event.key == "Delete") {
        document.getElementById("blackhole").click();
    }
    else if (event.key == ".") {
        document.getElementById("ponto").click();
    }
    else if (event.key == "Control") {
        document.getElementById("sinal").click();
    }
    else if (event.key == "r") {
        document.getElementById("raiz").click();
    }
    else if (event.key == "^") {
        document.getElementById("potencia").click();
    }
    else if (event.key == "q") {
        document.getElementById("mrc").click();
    }
    else if (event.key == "w") {
        document.getElementById("mMais").click();
    }
    else if (event.key == "e") {
        document.getElementById("mMenos").click();
    }
});
