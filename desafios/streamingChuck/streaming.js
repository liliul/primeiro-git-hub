// Importa o módulo 'fs'
const fs = require('fs');

// Cria um readable stream para ler o arquivo grande.txt
const readStream = fs.createReadStream('grande.txt');

// Cria um writable stream para escrever no arquivo copia.txt
const writeStream = fs.createWriteStream('copia.txt');

// Usa pipe() para conectar os streams
readStream.pipe(writeStream);

// O pipe() faz todo o trabalho de ler o arquivo em pedaços
// e escrever esses pedaços no novo arquivo, de forma automática e eficiente.
// Quando o processo termina, você pode receber um evento:
writeStream.on('finish', () => {
  console.log('Arquivo copiado com sucesso!');
});
