"use strict";
function Main() {
    const frutas = [
        { name: 'banana', price: 0.80 },
        { name: 'laranja', price: 0.40 },
        { name: 'maça', price: 0.50 },
        { name: 'abacate', price: 0.90 }
    ];
    const taxa = 0.20;
    let total = 0;
    let f = [];
    for (let fruta of frutas) {
        total += fruta.price + (fruta.price * taxa);
        f += fruta.name + ', ';
    }
    let media = total / frutas.length;
    console.log('total: ', total);
    console.log('media: ', media);
    console.log('frutas: ', f);
}
Main();
