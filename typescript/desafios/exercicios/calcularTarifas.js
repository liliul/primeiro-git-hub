"use strict";
/*
    09 - Cálculo de tarifas.
    Crie um programa que exibe o valor de uma tarifa dependendo da idade e tipo do usuário (estudante ou regular).

    O valor básico é R$2,50. Esse valor é alterado de acordo com a regra a seguir:

    Menores de 6 anos: grátis, tarifa zero;
    Estudantes: 50% de desconto;
    Idosos (60+): 30% de desconto;
    Regular: tarifa normal.
*/
function CalcularTarifas(idade) {
    if (idade <= 6) {
        Log(`tarifa gratis ${idade}`);
    }
    else if (idade > 6 && idade < 25) {
        const desconto = ((2.50 * 50) / 100);
        const precoFinal = 2.50 - desconto;
        Log(`tarifa com desconto de 50% fica: ${precoFinal} - idade ${idade}`);
    }
    else if (idade > 59) {
        const desconto = ((2.50 * 30) / 100);
        const precoFinal = 2.50 - desconto;
        Log(`acima de ${idade} anos a tarifa com desconto de 30% fica em ${precoFinal}`);
    }
    else {
        Log('tarifa normal 2,50');
    }
}
function Log(msg) {
    return console.log(msg);
}
CalcularTarifas(30);
CalcularTarifas(22);
CalcularTarifas(5);
CalcularTarifas(70);
CalcularTarifas(15);
