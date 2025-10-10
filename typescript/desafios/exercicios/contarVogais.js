function ContandoVagais(string) {
    var vogais = 'aeiouAEIOU';
    var counter = 0;
    for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
        var char = string_1[_i];
        if (vogais.includes(char)) {
            counter++;
        }
    }
    return counter;
}
Log("".concat(ContandoVagais('naruto uzumaki sasuke uchiha itachi')));
function Log(msg) {
    return console.log(msg);
}
