"use strict";
function faixaEtaria(idade) {
    switch (true) {
        case idade <= 12:
            Log(`idade ${idade} anos é criança.`);
            break;
        case idade >= 13 && idade <= 17:
            Log(`idade entre ${idade} anos adolescente`);
            break;
        case idade >= 18 && idade <= 59:
            Log(`idade ${idade} adulto`);
            break;
        case idade >= 60:
            Log(`idade com ${idade} idoso`);
            break;
        default:
            Log('Erro informar idade corretamente');
            break;
    }
}
function Log(msg) {
    return console.log(msg);
}
faixaEtaria(60);
faixaEtaria(40);
faixaEtaria(5);
faixaEtaria(89);
faixaEtaria(25);
