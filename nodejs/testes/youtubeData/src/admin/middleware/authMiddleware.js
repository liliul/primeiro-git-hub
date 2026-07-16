export function authMiddleware(tokenService) {
  return function authenticate(req, res, next) {
    const header = req.cookies.authAccessToken

    if (!header){
      return res.status(401).json({
        error: "Token ausente"
      })
    }

    try {
      const decoded = tokenService.verify(header)
      if (decoded.type !== 'access') {
        return res.status(401).json({ error: 'Tipo de token inválido' });
      }
      
      req.user = decoded
      
      next()
    } catch {
      res.status(401).json({ error: 'Token inválido ou expirado' })
    }
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Acesso negado' })
    }
    
    next()
  }
}