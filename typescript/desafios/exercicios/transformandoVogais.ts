/*
    exercicio: transform essa entrada 'naruto uzumaki' nessa saida 'nAruto uzumAki'
*/

function transformandoVogais(txt: string): string {
  const vogal = ['a']
  return txt
    .split('')
    .map((char) => vogal.includes(char.toLowerCase()) ? char.toUpperCase() : char)
    .join('')
}

console.log(transformandoVogais('naruto uzumaki'))

function transformandoVogais2(txt: string): string {
  return txt.replace(/[a]/g, (v) => v.toUpperCase())
}

console.log(transformandoVogais2('naruto uzumaki'))