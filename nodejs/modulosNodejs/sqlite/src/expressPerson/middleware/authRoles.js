const logger = require("../logger/logger");

function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.role)) {
      logger.error(`LOGS erro no role ${rolesPermitidos}`)
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    logger.warn(`LOGS role permitida: ${rolesPermitidos}`)
    next();
  };
}

module.exports = authorizeRoles