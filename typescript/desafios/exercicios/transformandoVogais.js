/*
    exercicio: transform essa entrada 'naruto uzumaki' nessa saida 'nAruto uzumAki'
*/
function transformandoVogais(txt) {
    var vogal = ['a'];
    return txt
        .split('')
        .map(function (char) { return vogal.includes(char.toLowerCase()) ? char.toUpperCase() : char; })
        .join('');
}
console.log(transformandoVogais('naruto uzumaki'));
function transformandoVogais2(txt) {
    return txt.replace(/[a]/g, function (v) { return v.toUpperCase(); });
}
console.log(transformandoVogais2('naruto uzumaki'));
