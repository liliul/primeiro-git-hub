const logger = require("../logger/logger");

function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!rolesPermitidos.includes(req.user.role)) {
      logger.error(`Acesso negado. Role do usuário: '${userRole}', Roles permitidos: [${rolesPermitidos.join(', ')}]`);
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    logger.info(`Acesso autorizado. Role do usuário: '${userRole}'`)
    
    next();
  };
}

module.exports = authorizeRoles