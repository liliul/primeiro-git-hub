const express = require('express');
const {adminMiddleware, authMiddleware} = require('../middleware/auth')

const router = express.Router()

// Rota para usuários autenticados
router.get('/profile', authMiddleware, (req, res) => {
  // A requisição só chega aqui se o token for válido
  console.log(req.auth.id);

  res.json({ message: `Bem-vindo, usuário ${req.auth.id}` });
});

// Rota protegida apenas para admins
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  res.json({ message: `Você está na área de admin. ${req.auth.id}` });
});

// testando 
router.get('/nokia', authMiddleware, adminMiddleware, (req, res) => {
  // A requisição só chega aqui se o usuário for autenticado e admin
  console.log(req.body);
  
  res.json({ message: 'Site da Nokia Smartphones.' });
});

module.exports = {router}