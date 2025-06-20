class Funcionario {
    private _salario: number = 0;
    public cargo: string = "iniciante";

    promover() {
        this.lerSalario
    }
    get lerSalario(){
       return this._salario;
    }
    set lerSalario(salario: number) {
        console.log(this._salario = salario );
    }
}

const funcionario = new Funcionario()
funcionario.promover()