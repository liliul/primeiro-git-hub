// exemplo basico

class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar(): string {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  }
}

const p1 = new Pessoa("João", 30);
console.log(p1.apresentar());


/**
 * Modificadores de Acesso
    public (padrão): acessível de qualquer lugar

    private: acessível somente dentro da classe

    protected: acessível na classe e subclasses
 */

class Conta {
  public numero: string;
  protected saldo: number;
  private senha: string;

  constructor(numero: string, saldo: number, senha: string) {
    this.numero = numero;
    this.saldo = saldo;
    this.senha = senha;
  }

  mostrarSaldo(): number {
    return this.saldo;
  }
}


// herança extends
class Funcionario extends Pessoa {
  cargo: string;

  constructor(nome: string, idade: number, cargo: string) {
    super(nome, idade); // chama o construtor da classe mãe
    this.cargo = cargo;
  }

  apresentar(): string {
    return `${super.apresentar()} Eu trabalho como ${this.cargo}.`;
  }
}

const f1 = new Funcionario("Maria", 28, "Desenvolvedora");
console.log(f1.apresentar());

//class abstratas
abstract class Animal {
  constructor(public nome: string) {}

  abstract emitirSom(): void;
}

class Cachorro extends Animal {
  emitirSom() {
    console.log("Au Au!");
  }
}

const dog = new Cachorro("Rex");
dog.emitirSom();

// interface com classes
interface Logavel {
  logar(): void;
}

class Usuario implements Logavel {
  constructor(public nome: string) {}

  logar() {
    console.log(`${this.nome} está logado.`);
  }
}

// get set
class Produto {
  private _preco: number;

  constructor(preco: number) {
    this._preco = preco;
  }

  get preco(): number {
    return this._preco;
  }

  set preco(valor: number) {
    if (valor >= 0) {
      this._preco = valor;
    }
  }
}

// menbros staticos
class Util {
  static saudacao(): string {
    return "Olá do Util!";
  }
}

console.log(Util.saudacao());

// class com tipos
class Carro {
  constructor(public marca: string) {}
}

function exibirCarro(c: Carro) {
  console.log("Carro:", c.marca);
}

// parenmetros publicos no construtor
class Cliente {
  constructor(public nome: string, public email: string) {}
}


// exemplo completo
abstract class Veiculo {
  constructor(public modelo: string, protected velocidade: number) {}

  abstract acelerar(): void;

  mostrarVelocidade() {
    console.log(`Velocidade: ${this.velocidade} km/h`);
  }
}

class Carro extends Veiculo {
  acelerar() {
    this.velocidade += 10;
  }
}

const civic = new Carro("Civic", 100);
civic.acelerar();
civic.mostrarVelocidade();
