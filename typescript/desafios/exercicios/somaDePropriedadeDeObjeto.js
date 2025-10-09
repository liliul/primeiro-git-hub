"use strict";
/*
Soma de propriedades de um objeto
Seu programa irá receber um objeto com diversas propriedades contendo valores numéricos.
Você deve retornar a soma dos valores dessas propriedades.
*/
function SomaPropriedadeObjecto(objeto) {
    return Object.values(objeto).reduce((acum, valor) => {
        return acum + valor;
    }, 0);
}
function SomaPropriedadeObjecto2(objeto) {
    for (const chave in objeto) {
        Log(`${chave}`);
        Log(`${objeto[chave]}`);
    }
}
function Log(msg) {
    return console.log(msg);
}
const objeto = {
    n: 2,
    s: 3,
    a: 5,
    d: 10,
    w: 15,
};
const ver2 = SomaPropriedadeObjecto(objeto);
Log(`${ver2}`);
SomaPropriedadeObjecto2(objeto);
