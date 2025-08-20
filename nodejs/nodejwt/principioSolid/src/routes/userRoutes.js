const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');
const db = require('../database/connection'); // Importa a conexão do banco de dados

// Cria uma instância do UserController, injetando a dependência do DB
const userController = new UserController(db);

// Rotas Públicas
router.get("/", userController.getAllUsers.bind(userController)); // Rota de teste/busca de todos os usuários
router.get("/get", userController.getAllUsers.bind(userController)); // Duplicata para fins de exemplo original, manter ou remover
router.post('/cadastrar', userController.registerUser.bind(userController));
router.post('/login', userController.loginUser.bind(userController));

// Rotas Protegidas (requerem autenticação)
router.get('/profile', authenticateToken, userController.getProfile.bind(userController));

// Rotas Protegidas para Administradores (requerem autenticação E autorização de admin)
router.get('/admin', authenticateToken, authorizeAdmin, userController.getAdminPage.bind(userController));
router.get('/nokia', authenticateToken, authorizeAdmin, userController.getNokiaPage.bind(userController));
router.post('/criarusuariologin/', authenticateToken, authorizeAdmin, userController.createUserByAdmin.bind(userController));
router.put('/login/:id', authenticateToken, authorizeAdmin, userController.updateUserByAdmin.bind(userController));
router.delete('/login/:id', authenticateToken, authorizeAdmin, userController.deleteUserByAdmin.bind(userController));

module.exports = router;