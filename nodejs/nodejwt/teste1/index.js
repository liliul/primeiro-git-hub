// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const app = express();
const port = 3000;

app.use(express.json());

// Chave secreta do JWT (deve ser mantida em segredo!)
const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte';

// Dados de exemplo (em um projeto real, seriam de um banco de dados)
const users = [
  { id: 1, username: 'li', role: 'user' },
  { id: 2, username: 'admin', role: 'admin' }
];

// --- Rota de Autenticação (Login) ---
app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
    console.log(user);
    
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Gera o token JWT com o ID e o papel do usuário
  const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

  res.json({ token });
});

// --- Middleware de Autenticação (verifica o token) ---
const authMiddleware = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256']
});

// --- Middleware de Autorização (verifica o papel) ---
const adminMiddleware = (req, res, next) => {
  // express-jwt já adicionou o 'auth' no objeto de requisição
  // O 'auth' contém o payload do token
  if (req.auth && req.auth.role === 'admin') {
    next(); // Permite o acesso
  } else {
    res.status(403).json({ message: 'Acesso negado. Requer permissão de admin.' });
  }
};

// --- Rotas Protegidas ---
// Rota para usuários autenticados
app.get('/profile', authMiddleware, (req, res) => {
  // A requisição só chega aqui se o token for válido
  console.log(req.auth.id);
  
  res.json({ message: `Bem-vindo, usuário ${req.auth.id}` });
});

// Rota protegida apenas para admins
app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  res.json({ message: 'Você está na área de admin.' });
});

// testando 
app.get('/nokia', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  console.log(req.body);
  
  res.json({ message: 'Site da Nokia Smartphones.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});