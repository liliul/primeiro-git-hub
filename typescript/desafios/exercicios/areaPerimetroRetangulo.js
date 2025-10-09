"use strict";
/*

Fórmulas:

Área: 𝐴 = base x altura

Perímetro:

P = 2 x (base + altura)

*/
function CalcularAreaPerimetroRetangulo(valor1, valor2) {
    const area = valor1 * valor2;
    const perimetro = 2 * (valor1 + valor2);
    return Log(`Area ${area} do retangulo && Perimetro ${perimetro}.`);
}
function Log(msg) {
    return console.log(msg);
}
CalcularAreaPerimetroRetangulo(8, 4);
CalcularAreaPerimetroRetangulo(15, 10);
CalcularAreaPerimetroRetangulo(900, 300);
