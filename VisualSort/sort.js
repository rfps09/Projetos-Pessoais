var cnv = document.getElementById("quadro");
var ctx = cnv.getContext("2d");
ctx.fillStyle = "#FFFFFF";
var then = performance.now();
var now = performance.now();

function render(vetor) {
    ctx.clearRect(0,0,cnv.width, cnv.height);
    var len = vetor.length;
    for(let i=0; i < len; i++) {
        ctx.fillRect(80*i,600-60*vetor[i],80,60*vetor[i]);
    }
}

var vetorTeste = [9,7,3,8,6,2,5,1,4,10];

render(vetorTeste);

function insertionSort(vetor) {
    var len = vetor.length;
    for(let i=1; i < len; i++) {
        let j=i;
        while(j && vetor[j] < vetor[j-1]) {
            let aux = vetor[j];
            vetor[j] = vetor[j-1];
            vetor[j-1] = aux;
            j--;
            render(vetor)
        }
    }
}

insertionSort(vetorTeste);