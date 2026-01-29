// usando polimorfismo
var FreteNormal = /** @class */ (function () {
    function FreteNormal() {
    }
    FreteNormal.prototype.calcular = function (peso) {
        return peso * 5;
    };
    return FreteNormal;
}());
var FreteExpresso = /** @class */ (function () {
    function FreteExpresso() {
    }
    FreteExpresso.prototype.calcular = function (peso) {
        return peso * 10 + 20;
    };
    return FreteExpresso;
}());
var FreteInternacional = /** @class */ (function () {
    function FreteInternacional() {
    }
    FreteInternacional.prototype.calcular = function (peso) {
        return peso * 20 + 100;
    };
    return FreteInternacional;
}());
var FreteGratis = /** @class */ (function () {
    function FreteGratis() {
    }
    FreteGratis.prototype.calcular = function () {
        return 0;
    };
    return FreteGratis;
}());
function calcularFrete(frete, peso) {
    return frete.calcular(peso);
}
var normal = new FreteNormal();
var expresso = new FreteExpresso();
var internacional = new FreteInternacional();
var gratis = new FreteGratis();
console.log(calcularFrete(normal, 10));
console.log(calcularFrete(expresso, 10));
console.log(calcularFrete(internacional, 10));
console.log(calcularFrete(gratis, 10));
