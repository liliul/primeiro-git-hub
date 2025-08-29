const express = require('express')
const AccountController = require('../controllers/accountController');
const db = require('../database')
const authenticateToken = require('../middleware/auth')
const authorizeRoles = require('../middleware/authRoles')
const logger = require('../logger/logger')

const accountRouter = express.Router()
const accountController = new AccountController(db)

accountRouter.use((req, res, next) => {
  logger.info(`LOG global [${req.method}] ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

accountRouter.post('/registro/', accountController.registro.bind(accountController))
accountRouter.post('/login/', accountController.login.bind(accountController))

accountRouter.get('/:id/clienteid', authenticateToken, authorizeRoles('admin', 'master'), accountController.clientesID.bind(accountController))
accountRouter.get('/clientes/', authenticateToken, authorizeRoles('admin', 'master'), accountController.clientes.bind(accountController))
accountRouter.put('/addroles/:id/roles', authenticateToken, authorizeRoles('master'), accountController.addRoles.bind(accountController))

accountRouter.delete('/deleteregistro/:id', authenticateToken, authorizeRoles('master'), accountController.deleteRegistro.bind(accountController))

module.exports = accountRouter