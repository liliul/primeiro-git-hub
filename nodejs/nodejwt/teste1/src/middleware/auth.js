const {jwtSecret} = require('./config')
const { expressjwt } = require('express-jwt');

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

module.exports = { authMiddleware, adminMiddleware}
