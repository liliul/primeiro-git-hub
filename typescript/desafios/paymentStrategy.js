var paymentStrategies = {
    pix: function (amount) { return "Pague R$".concat(amount, " via Pix"); },
    card: function (amount) { return "Cobrando R$".concat(amount, " no cart\u00E3o"); },
    boleto: function (amount) { return "Boleto de R$".concat(amount, " gerado"); },
};
var Checkout = /** @class */ (function () {
    function Checkout(strategy) {
        this.strategy = strategy;
    }
    Checkout.prototype.pay = function (amount) {
        return paymentStrategies[this.strategy](amount);
    };
    return Checkout;
}());
var checkoutCard = new Checkout('card');
console.log(checkoutCard.pay(150));
var checkoutBoleto = new Checkout('boleto');
console.log(checkoutBoleto.pay(160));
var checkoutPix = new Checkout('pix');
console.log(checkoutPix.pay(112));
