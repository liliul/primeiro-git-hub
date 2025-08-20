// server.js
require('dotenv').config(); 

const express = require('express');
const app = express();
const port = 3000;

// Importa a conexão com o banco de dados (apenas para iniciar, não é injetado diretamente nas rotas aqui)
const db = require('./src/database/connection'); 

// Importa as rotas de usuário
const userRoutes = require('./src/routes/userRoutes');

// Middlewares globais
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(express.static("public")); // Serve arquivos estáticos da pasta 'public'

// Define as rotas
// Todas as rotas definidas em userRoutes.js serão acessíveis sob o caminho raiz '/'
app.use('/', userRoutes); 

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log('Acesse http://localhost:3000/');
});
