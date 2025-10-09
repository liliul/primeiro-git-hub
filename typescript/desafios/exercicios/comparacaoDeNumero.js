"use strict";
function ComparandoNumero(x, y) {
    if (x > y) {
        Log(`X é maior que Y`);
    }
    else if (y > x) {
        Log(`Y é maior que X`);
    }
    else {
        Log("X é igual Y");
    }
}
function Log(msg) {
    return console.log(msg);
}
ComparandoNumero(10, 20);
ComparandoNumero(5, 15);
ComparandoNumero(100, 40);
ComparandoNumero(900, 2000);
ComparandoNumero(33333333330, 444444420);
ComparandoNumero(5, 5);
