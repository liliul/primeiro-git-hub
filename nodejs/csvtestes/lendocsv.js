const fs = require('fs');
const csv = require('csv-parser');

const resultados = [];

fs.createReadStream('produtos.csv')
  .pipe(csv({separator: ';'}))
  .on('data', (dado) => resultados.push(dado))
  .on('end', () => {
    // console.log(typeof resultados);
    // Faça o que precisar com os dados (ex: salvar no banco de dados)

    // console.log(resultados);
    const sortdesc = resultados.sort((a, b) => a.IdProduto - b.IdProduto)
    console.log(sortdesc);
    
  })
  .on('error', (erro) => {
    console.error('Ocorreu um erro:', erro);
  });
