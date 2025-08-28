require('dotenv').config();
const express = require('express');
const authMiddleware = require('./middleware/auth');
const roleMiddleware = require('./middleware/role');
const connectDB = require('./config/db');
const authorizeRoles = require('../../sqlite/src/expressPerson/middleware/authRoles');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));

// Rota protegida: qualquer usuário autenticado
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo, usuário com role: ${req.user.role}` });
});

// Rota protegida: apenas admin
app.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Bem-vindo, administrador!' });
});

// Rota protegida: admin e moderador
app.get('/moderador-ou-admin', authMiddleware, roleMiddleware(['admin', 'moderador']), (req, res) => {
  res.json({ message: 'Bem-vindo, moderador ou admin!' });
});

app.get('/painel-super', authMiddleware, authorizeRoles('superadmin'), (req, res) => {
    res.json({ message: 'Acesso ao painel de controle completo', data: [{id: 1, nome: 'super adimin'}] });
  }
);


app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
