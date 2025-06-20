var Funcionario = /** @class */ (function () {
    function Funcionario() {
        this._salario = 0;
        this.cargo = "";
    }
    Funcionario.prototype.build = function () {
        this.promover(this._salario);
    };
    Object.defineProperty(Funcionario.prototype, "lerSalario", {
        get: function () {
            return this._salario;
        },
        set: function (salario) {
            if (salario <= 0) {
                this.cargo = 'Cargo: sem cargo';
                return;
            }
            this._salario = salario;
        },
        enumerable: false,
        configurable: true
    });
    Funcionario.prototype.promover = function (salario) {
        if (salario >= 1500) {
            this.cargo = 'Cargo: Iniciante.';
        }
        if (salario >= 2100) {
            this.cargo = 'Cargo: Limpador';
        }
        if (salario >= 3500) {
            this.cargo = 'Cargo: Caixa';
        }
    };
    return Funcionario;
}());
var funcionario = new Funcionario();
funcionario.lerSalario = 4100;
funcionario.build();
console.log('R$', funcionario.lerSalario);
console.log(funcionario.cargo);
