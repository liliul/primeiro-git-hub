function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }
    next();
  };
}

module.exports = authorizeRoles