const express = require('express')
const AccountController = require('../controllers/accountController');
const db = require('../database')
const authenticateToken = require('../middleware/auth')
const authorizeRoles = require('../middleware/authRoles')


const accountRouter = express.Router()
const accountController = new AccountController(db)

accountRouter.post('/registro/', accountController.registro.bind(accountController))
accountRouter.post('/login/', accountController.login.bind(accountController))

accountRouter.get('/clientes/', authenticateToken, authorizeRoles('admin', 'master'), accountController.clientes.bind(accountController))
accountRouter.put('/addroles/:id/roles', authenticateToken, authorizeRoles('master'), accountController.addRoles.bind(accountController))


module.exports = accountRouter