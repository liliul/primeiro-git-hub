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

const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Não autorizado. Faça login para continuar.' });
    }
};

export const authRoles = {
    isSuperAdmin,
    isAdmin,
    isAuthenticated
};