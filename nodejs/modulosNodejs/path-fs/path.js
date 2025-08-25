const path = require('path')

// console.log(path);
const partes = path.parse('~/liliu/Documentos/gclone/outros/primeiro-git-hub/nodejs/modulosNodejs/bcrypt/index1.js');
console.log('parse: ', partes);

// Esperado: C:/Users/Joao/Documents/projeto
const diretorio = path.dirname('~/liliu/Documentos/gclone/outros/primeiro-git-hub/nodejs/modulosNodejs/index1.js');
console.log('dirname: ', diretorio); 

const nomeArquivo = path.basename('~/liliu/Documentos/gclone/outros/primeiro-git-hub/nodejs/modulosNodejs/index.js');
console.log('basename: ', nomeArquivo); 

// Esperado: Caminho absoluto para public/index.html
const caminhoAbsoluto = path.resolve('pastaTeste', 'index.html');
console.log('resolve: ', caminhoAbsoluto); 

// Esperado: src/app.js
const caminho = path.join('src', 'path.js');
console.log(caminho); 