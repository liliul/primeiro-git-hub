function ContandoVagais(string: string) {
    const vogais = 'aeiouAEIOU'
    let counter = 0

    for (let char of string) {
        if (vogais.includes(char)) {
            counter++
        }
    }

    return counter
}

Log(`${ContandoVagais('naruto uzumaki sasuke uchiha itachi')}`)

function Log(msg: string) {
    return console.log(msg);
}