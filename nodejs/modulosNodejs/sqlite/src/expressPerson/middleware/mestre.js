function requireMaster(req, res, next) {
  if (req.user.role !== 'master') {
    return res.status(403).json({ message: 'Apenas o administrador mestre pode acessar essa rota.' });
  }
  next();
}

module.exports = requireMaster