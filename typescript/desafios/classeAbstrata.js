/**
 *  Clases abstract nao se instancia
 *
 *  ex: const pagamento = new Pagamento / erro
 *
 * **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pagamento = /** @class */ (function () {
    function Pagamento() {
        this.taxa = 0;
    }
    Pagamento.prototype.calcularTotal = function (valor) {
        return valor + this.taxa;
    };
    return Pagamento;
}());
var CartaoCredito = /** @class */ (function (_super) {
    __extends(CartaoCredito, _super);
    function CartaoCredito() {
        var _this = _super.call(this) || this;
        _this.taxa = 5;
        return _this;
    }
    CartaoCredito.prototype.pagar = function (valor) {
        var total = this.calcularTotal(valor);
        console.log('Cartão de credito: ', total);
    };
    return CartaoCredito;
}(Pagamento));
var Pix = /** @class */ (function (_super) {
    __extends(Pix, _super);
    function Pix() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pix.prototype.pagar = function (valor) {
        console.log('Pix: ', valor);
    };
    return Pix;
}(Pagamento));
var Boleto = /** @class */ (function (_super) {
    __extends(Boleto, _super);
    function Boleto() {
        var _this = _super.call(this) || this;
        _this.taxa = 2;
        return _this;
    }
    Boleto.prototype.pagar = function (valor) {
        var total = this.calcularTotal(valor);
        console.log('Boleto bancario: ', total);
    };
    return Boleto;
}(Pagamento));
var pagamento = [
    new CartaoCredito(),
    new Pix(),
    new Boleto()
];
pagamento.forEach(function (functionPagamentos) {
    var results = functionPagamentos.pagar(10);
    return results;
});
