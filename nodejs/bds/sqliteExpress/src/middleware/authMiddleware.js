const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
    // 1. Obter o token do cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }

    // Espera-se que o token venha no formato "Bearer SEU_TOKEN"
    const token = authHeader.split(' ')[1]; // Pega a segunda parte após "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Formato de token inválido." });
    }

    // 2. Verificar o token
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            // jwt.verify pode falhar por:
            // - Token inválido (JsonWebTokenError)
            // - Token expirado (TokenExpiredError)
            console.error('Erro de verificação de token:', err.message);
            return res.status(403).json({ message: "Token inválido ou expirado." });
        }

        // 3. Se o token for válido, anexar as informações do usuário à requisição
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        // Você pode anexar todo o objeto 'decoded' se quiser: req.user = decoded;

        // 4. Chamar next() para passar a requisição para o próximo middleware/rota
        next();
    });
};