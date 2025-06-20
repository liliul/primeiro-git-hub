class Funcionario {
    private _salario: number = 0;
    public cargo: string = "";

    build() {
        this.promover(this._salario);
    }

    get lerSalario(): number {
       return this._salario;                           
    }

    set lerSalario(salario: number) {
        if (salario <= 0) {
            this.cargo = 'Cargo: sem cargo';
            return
        }

        this._salario = salario;
    }

    promover(salario: number) {

        if (salario >= 1500) {
            this.cargo = 'Cargo: Iniciante.';
        }

        if (salario >= 2100) {
            this.cargo = 'Cargo: Limpador';
        }

        if (salario >= 3500) {
            this.cargo = 'Cargo: Caixa';            
        }

    }
}

const funcionario = new Funcionario()
funcionario.lerSalario = 4100;

funcionario.build();
console.log('R$', funcionario.lerSalario);
console.log(funcionario.cargo);



// chatgpt

// class Funcionario {
//   private _salario: number = 0;
//   public cargo: string = "";

//   get lerSalario(): number {
//     return this._salario;
//   }

//   set lerSalario(salario: number) {
//     if (salario <= 0) {
//       this.cargo = "Cargo: sem cargo";
//       return;
//     }

//     this._salario = salario;
//     this.promover(); // ✅ promoção automática ao definir salário
//   }

//   private promover(): void {
//     if (this._salario >= 3500) {
//       this.cargo = "Cargo: Caixa";
//     } else if (this._salario >= 2100) {
//       this.cargo = "Cargo: Limpador";
//     } else if (this._salario >= 1500) {
//       this.cargo = "Cargo: Iniciante.";
//     } else {
//       this.cargo = "Cargo: sem cargo";
//     }
//   }
// }

// // Teste
// const funcionario = new Funcionario();
// funcionario.lerSalario = 4100;

// console.log("R$", funcionario.lerSalario); // R$ 4100
// console.log(funcionario.cargo);            // Cargo: Caixa
