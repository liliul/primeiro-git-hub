/*
Concatenar arrays
Receba dois arrays e retorne um novo array que é a união de todos os elementos dos arrays anteriores.

Exemplo:

Entrada: [0, 1, 2] e [1, 2, 3]
Saída: [0, 1, 2, 1, 2, 3]
*/

function ConcatenarArrays(array1: string[] | number[], array2: string[] | number[]) {
    const arraysJuntos: (string | number)[] = [...array1, ...array2]
    return Log(`${arraysJuntos}`)
}

function Log(msg: string) {
    return console.log(msg);
}

ConcatenarArrays([0,1,2],[1,2,3])
ConcatenarArrays(['naruto','goku'], ['vegeta','kakashi','itachi'])

Log('-----------------------------------')

/*
Interseção de arrays
Receba dois arrays e retorne um novo array com os elementos que os dois 
arrays anteriores têm em comum.
*/

function IntersecaoDeArrays() {
    const array1: string[] = ['madara','sasuke']
    const array2: string[] = ['gai','sasuke', 'madara']

    const juntarArrays = new Set(array2)
    
    return array1.filter((i) => {
        juntarArrays.has(i)
    })
}

const ver = IntersecaoDeArrays()
console.log(ver);

Log('-----------------------------------------')

function intersecao<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(item => arr2.includes(item));
}

const inte = intersecao(['a','b'],['c','d','a','B'])
console.log(inte)
