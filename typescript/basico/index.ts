let nome: string = "João";
let idade: number = 30;
let ativo: boolean = true;

function saudacao(pessoa: string): string {
  return "Olá, " + pessoa;
}

console.log(saudacao(nome));

let numeros: number[] = [1, 2, 3];
let nomes2: string[] = ["Goku", "Naruto"];

console.log(numeros, nomes2);

let pessoa: { nome: string; idade: number } = {
  nome: "Itachi",
  idade: 28
};

console.log(pessoa);

function soma(a: number, b: number): number {
  return a + b;
}

let somar = soma(5, 5)

console.log(somar);


/**
 *  
 *  interfaces e types
 * 
*/

// interfaces
interface Pessoa {
  nome: string;
  idade: number;
}

const joao: Pessoa = {
  nome: "João",
  idade: 30
};

// interface com metodo
interface Usuario {
  nome: string;
  login(): void;
}

const user: Usuario = {
  nome: "Maria",
  login() {
    console.log(`${this.nome} fez login`);
  }
};

// herança
interface Pessoa {
  nome: string;
}

interface Funcionario extends Pessoa {
  salario: number;
}

const f: Funcionario = {
  nome: "Lucas",
  salario: 5000
};

// tipos opicional e readonly
interface Produto {
  nome: string;
  preco: number;
  descricao?: string; // opcional
  readonly id: string; // não pode ser alterado
}

// tipos generico com interface
interface ApiResponse<T> {
  sucesso: boolean;
  dados: T;
}

const resposta1: ApiResponse<string> = {
  sucesso: true,
  dados: "OK"
};

const resposta2: ApiResponse<number[]> = {
  sucesso: true,
  dados: [1, 2, 3]
};

// interface com function
interface Operacao {
  (a: number, b: number): number;
}

const soma: Operacao = (a, b) => a + b;

// inteface com class
interface Usuario {
  nome: string;
  login(): void;
}

class Admin implements Usuario {
  constructor(public nome: string) {}

  login() {
    console.log(`${this.nome} (Admin) logou`);
  }
}


// types
type Animal = {
  nome: string;
  especie: string;
};

const cachorro: Animal = {
  nome: "Rex",
  especie: "Cão"
};

type Resultado = "ok" | "erro" | "pendente";

// herança
type Pessoa = {
  nome: string;
};

type Funcionario = Pessoa & {
  salario: number;
};

// union types
type Sucesso = { status: "ok"; dados: string };
type Erro = { status: "erro"; mensagem: string };

type Resposta = Sucesso | Erro;

const r: Resposta = {
  status: "erro",
  mensagem: "Algo deu errado"
};

