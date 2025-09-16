import db from '../db/indexDB.js'

const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super-admin') {
        next()
    } else {
        res.status(403).json({ message: 'Acesso negado. Apenas Super-Admin pode acessar esta rota.' });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'super-admin')) {
        next()
    } else {
        res.status(403).json({ message: 'Acesso negado. Apenas Admin pode acessar esta rota.' });
    }
}

const isAuthenticated =  async (req, res, next) => {
    const userIdFromToken = req.user.id;
    const userRole = req.user.role;
    const targetUserId = req.params.id;

    try {
      if (userRole === 'super-admin') {
        return next()
      }

      if (userIdFromToken === targetUserId) {
        return next();
      }
      
      const targetUserResult = await db.query('SELECT role FROM users WHERE id = $1', [targetUserId]);
      
      if (targetUserResult.rowCount === 0) {
          return next();
      }

      const targetUserRole = targetUserResult.rows[0].role;

      if (userRole === 'user' && (targetUserRole === 'admin' || targetUserRole === 'super-admin')) {
          return res.status(403).json({ 
              message: 'Acesso negado. Você não pode editar um perfil de administrador.' 
          });
      }
      
      res.status(403).json({ 
          message: 'Acesso negado. Você não tem permissão para editar as informações deste usuário.' 
      })
    } catch (error) {
        console.error('Erro na autorização:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

export const authRoles = {
    isSuperAdmin,
    isAdmin,
    isAuthenticated
}