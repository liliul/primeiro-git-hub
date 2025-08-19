// server.js
require('dotenv').config(); // Carrega as variáveis de ambiente

const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const app = express();
const port = 3000;

const db = require('./src/conexao');

app.use(express.json());

// Chave secreta do JWT (deve ser mantida em segredo!)
const jwtSecret = process.env.JWT_SECRET || 'uma-chave-secreta-muito-forte';


// teste do banco de dados
app.get("/", (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) return res.status(500).json(err);

      const { username } = req.body;
   

      const user = results.find(u => u.username === username);
        console.log(user);
        
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      // Gera o token JWT com o ID e o papel do usuário
      const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
  });

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
  res.json({ message: `Você está na área de admin. ${req.auth.id}` });
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