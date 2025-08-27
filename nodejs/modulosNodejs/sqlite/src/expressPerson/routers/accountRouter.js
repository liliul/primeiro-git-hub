const express = require('express')
const AccountController = require('../controllers/accountController');
const db = require('../database')
const authenticateToken = require('../middleware/auth')

const accountRouter = express.Router()
const accountController = new AccountController(db)

accountRouter.post('/registro/', accountController.registro.bind(accountController))
accountRouter.post('/login/', accountController.login.bind(accountController))

accountRouter.get('/clientes/', authenticateToken, accountController.clientes.bind(accountController))
accountRouter.get('/naruto/', authenticateToken, accountController.naruto.bind(accountController))


module.exports = accountRouter