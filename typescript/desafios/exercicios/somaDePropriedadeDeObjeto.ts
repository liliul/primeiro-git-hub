/*
Soma de propriedades de um objeto
Seu programa irá receber um objeto com diversas propriedades contendo valores numéricos.
Você deve retornar a soma dos valores dessas propriedades.
*/

function SomaPropriedadeObjecto(objeto: object) {
    return Object.values(objeto).reduce((acum, valor) => {
        return acum + valor 
    }, 0)
}

function SomaPropriedadeObjecto2(objeto: object) {
    for (const chave in objeto) {
        Log(`${chave}`)
        Log(`${objeto[chave]}`)
    }
}


function Log(msg: string) {
    return console.log(msg);
}

const objeto: object = {
    n: 2,
    s: 3,
    a: 5,
    d: 10,
    w: 15,
}

const ver2: void = SomaPropriedadeObjecto(objeto)
Log(`${ver2}`)

SomaPropriedadeObjecto2(objeto)