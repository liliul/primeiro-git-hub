const express = require('express')
const AccountController = require('../controllers/accountController');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();
const db = require('../database')

const accountRouter = express.Router()
const accountController = new AccountController(db)

accountRouter.post('/registro/', accountController.registro.bind(accountController))
accountRouter.post('/login/', accountController.login.bind(accountController))

accountRouter.get('/clientes/', authenticateToken, accountController.clientes.bind(accountController))
accountRouter.get('/naruto/', authenticateToken, accountController.naruto.bind(accountController))

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Obtém o token do cabeçalho

  if (token == null) return res.sendStatus(401); // Se não houver token, retorna erro 401 (Não Autorizado)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Se o token for inválido, retorna erro 403 (Proibido)
    req.user = decoded; // Adiciona os dados decodificados ao objeto de requisição
    next(); // Prossegue para a próxima função (a rota protegida)
  });
}
module.exports = accountRouter