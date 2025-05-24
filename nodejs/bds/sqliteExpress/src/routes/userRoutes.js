// src/routes/userRoutes.js

const express = require('express');
const router = express.Router(); // Cria um novo objeto Router
const userController = require('../controllers/userController'); // Importa o controlador
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Todas as rotas abaixo precisarão de um token válido

// Rotas para /users
router.get('/', userController.getAllUsers); // GET /users
router.get('/:id', userController.getUserById); // GET /users/:id
router.post('/', userController.createUser); // POST /users
router.put('/:id', userController.updateUser); // PUT /users/:id
router.delete('/:id', userController.deleteUser); // DELETE /users/:id

module.exports = router; // Exporta o router para ser usado em app.js