const fs = require('fs');
const path = require('path');
// console.log(fs);
const texto = path.resolve('testesPasta', 'texto1.txt')
const texto2 = path.resolve('testesPasta', 'texto2.txt')
const log = path.resolve('testesPasta', 'log.txt')


fs.readFile(texto, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
  } else {
    console.log('Conteúdo do arquivo:', data);
  }
});

fs.writeFile(texto2, 'Este é um novo conteúdo!', (err) => {
  if (err) {
    console.error('Erro ao escrever no arquivo:', err);
  } else {
    console.log('Arquivo criado com sucesso!');
  }
});

fs.appendFile(log, 'Conteúdo adicional!\n', (err) => {
  if (err) {
    console.error('Erro ao adicionar conteúdo no arquivo:', err);
  } else {
    console.log('Conteúdo adicionado com sucesso!');
  }
});

// Verifica se o arquivo existe de forma síncrona
if (fs.existsSync('exemplo.txt')) {
  console.log('O arquivo exemplo.txt existe!');
} else {
  console.log('O arquivo exemplo.txt não existe!');
}

fs.mkdir('criandoNovaPasta', (err) => {
  if (err) {
    if (err.code) {
        console.log('Diretorio já existe: ', err.path);
        
    }
    // console.error('Erro ao criar o diretório:', err);
  } else {
    console.log('Diretório criado com sucesso!');
  }
});

// Lista os arquivos do diretório atual de forma assíncrona
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Erro ao listar arquivos:', err);
  } else {
    console.log('Arquivos no diretório atual:', files);
  }
});

// Exclui o arquivo novo_arquivo.txt de forma assíncrona
// fs.unlink(log, (err) => {
//   if (err) {
//     console.error('Erro ao excluir o arquivo:', err);
//   } else {
//     console.log('Arquivo excluído com sucesso!');
//   }
// });


// Renomeia o arquivo de forma assíncrona
// const pasta = path.resolve('criandoNovaPasta', 'text.txt')
// fs.rename(pasta, path.resolve('criandoNovaPasta','text3.txt'),  (err) => {
//   if (err) {
//     console.error('Erro ao renomear o arquivo:', err);
//   } else {
//     console.log('Arquivo renomeado com sucesso!');
//   }
// });

// Lê os arquivos de forma síncrona no diretório
try {
  const arquivos = fs.readdirSync('testesPasta');
  console.log('Arquivos no diretório meu_diretorio:', arquivos);
} catch (err) {
  console.error('Erro ao listar arquivos:', err);
}


// Verifica se o caminho é um arquivo ou diretório
fs.stat(texto, (err, stats) => {
  if (err) {
    console.error('Erro ao verificar o caminho:', err);
  } else {
    if (stats.isFile()) {
      console.log('É um arquivo.');
    } else if (stats.isDirectory()) {
      console.log('É um diretório.');
    }
  }
});
