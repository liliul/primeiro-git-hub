const { expressjwt } = require('express-jwt');
const { jwtSecret } = require('../config/jwtConfig'); 

// Middleware para verificar o JWT
const authenticateToken = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'auth', // O payload do token será anexado a req.auth
});

// Middleware para verificar se o usuário é admin
const authorizeAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') {
    next(); // Permite o acesso
  } else {
    // Se não for admin, ou se o token não tiver a role 'admin'
    res.status(403).json({ message: 'Acesso negado. Requer permissão de administrador.' });
  }
};

// Middleware genérico para autorizar por múltiplos papéis
const authorizeRoles = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]; // Garante que roles seja um array
  }

  return (req, res, next) => {
    // Se nenhum papel for especificado, qualquer usuário autenticado pode acessar
    if (roles.length === 0 && req.auth) {
      return next();
    }

    if (req.auth && roles.includes(req.auth.role)) {
      next(); // Permite o acesso se o papel do usuário estiver na lista
    } else {
      res.status(403).json({ message: 'Acesso negado. Você não tem as permissões necessárias.' });
    }
  };
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeRoles
};