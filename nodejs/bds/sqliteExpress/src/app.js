// src/app.js

const express = require('express');
const { connectDatabase, closeDatabase } = require('./config/database'); // Importa funções do DB
const userRoutes = require('./routes/userRoutes'); // Importa as rotas de usuário

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// --- Conexão com o Banco de Dados ---
connectDatabase()
    .then(() => {
        // --- Rotas da API ---
        app.use('/users', userRoutes); // Usa as rotas de usuário sob o prefixo /users

        // Rota de teste simples para a raiz
        app.get('/', (req, res) => {
            res.send('API de Usuários com Express e SQLite.');
        });

        // --- Inicialização do Servidor ---
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

        // --- Lidar com o encerramento da aplicação para fechar o banco de dados ---
        process.on('SIGINT', () => {
            console.log('Recebido sinal SIGINT. Fechando o banco de dados...');
            closeDatabase();
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            console.log('Recebido sinal SIGTERM. Fechando o banco de dados...');
            closeDatabase();
            process.exit(0);
        });

    })
    .catch((err) => {
        console.error('Falha ao iniciar a aplicação devido a erro no banco de dados:', err);
        process.exit(1); // Encerra o processo se não conseguir conectar ao DB
    });