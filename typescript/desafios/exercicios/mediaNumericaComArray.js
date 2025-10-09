"use strict";
/*
Média dos elementos
Crie um programa que recebe um array numérico e retorna a média dos valores desses elementos.
*/
function MediaNumericaArray(arr) {
    const somaArr = arr.reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual;
    }, 0);
    const media = somaArr / arr.length;
    return Log(`A media: ${media}`);
}
function Log(msg) {
    return console.log(msg);
}
MediaNumericaArray([90, 12, 22, 14, 10, 120]);
