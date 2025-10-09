/*
Filtrando propriedades
Faça um programa que exiba somente as propriedades de um objeto que o usuário desejar.

Seu programa irá receber um objeto e um array contendo as propriedades desejadas.

Extra: faça uma verificação se a propriedade passada no array existe no objeto.
*/

function FiltrandoPropriedades(objeto: object) {
    for (let [chave, valor] of Object.entries(objeto as Record<string, any>)) {
        Log(`${chave} : ${valor}`)
    }
}

function Log(msg: string) {
    return console.log(msg);
}

const pessoa = {
  nome: "João",
  idade: 30,
  cidade: "São Paulo"
}

FiltrandoPropriedades(pessoa)

Log('---------------------------------------------')

const pessoa2 = {
  nome: "João",
  idade: 30,
  cidade: "São Paulo",
  profissao: "Desenvolvedor"
}

const propriedadesDesejadas = ["nome", "idade", "altura", "profissao"];

function filtrarPropriedades<T extends object>(objeto: T, propriedades: string[]): void {
  propriedades.forEach(prop => {
    if (prop in objeto) {
      const valor = (objeto as any)[prop];
      console.log(`${prop}: ${valor}`);
    } else {
      console.warn(`⚠️ Propriedade "${prop}" não existe no objeto.`);
    }
  });
}
filtrarPropriedades(pessoa2, propriedadesDesejadas)

Log('--------------------------------------')
/*
Versão que retorna um novo objeto filtrado:

Se você quiser retornar apenas as propriedades válidas como novo objeto:
*/
function getPropriedadesFiltradas<T extends object>(objeto: T, propriedades: string[]): Partial<T> {
  const resultado: Partial<T> = {};

  propriedades.forEach(prop => {
    if (prop in objeto) {
      resultado[prop as keyof T] = objeto[prop as keyof T];
    }
  });

  return resultado;
}

const filtrado = getPropriedadesFiltradas(pessoa2, propriedadesDesejadas);
console.log(filtrado);