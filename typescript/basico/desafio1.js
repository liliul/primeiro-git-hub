var Funcionario = /** @class */ (function () {
    function Funcionario() {
        this._salario = 0;
        this.cargo = "iniciante";
    }
    Funcionario.prototype.promover = function () {
        this.lerSalario();
    };
    Object.defineProperty(Funcionario.prototype, "lerSalario", {
        get: function () {
            return this._salario;
        },
        set: function (salario) {
            console.log(this._salario = salario);
        },
        enumerable: false,
        configurable: true
    });
    return Funcionario;
}());
var funcionario = new Funcionario();
funcionario.promover();
