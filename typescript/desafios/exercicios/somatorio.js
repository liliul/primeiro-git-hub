"use strict";
/*
Para somatórios simples (tipo 1 + 2 + ... + n), você pode usar fórmula direta:

∑ = (n (n + 1)) /2
     ​
return (n (n + 1)) / 2
*/
function Somatorio(inicio, fim) {
    let soma = 0;
    for (let i = inicio; i <= fim; i++) {
        soma += i;
    }
    return Log(`Somatorio é ${soma}`);
}
function Log(msg) {
    return console.log(msg);
}
Somatorio(1, 10);
