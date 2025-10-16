import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { pool } from "../config/db";
import { UsuarioRoles } from "../middleware/roles.middleware";

const router = Router()

router.get('/home', authenticateToken, UsuarioRoles('user', 'moderador', 'admin', 'superAdmin'), async (req: Request, res: Response) => {
    
    if (!req.user?.id) {
        console.log(req.user?.id);
        
        return res.status(401).json({ message: "Usuário não autenticado após middleware." });
    }
    // if (!req.user?.email) {
    //     return res.status(401).json({ message: "Usuário não autenticado após middleware." });
    // }

    const userId = req.user.id;
    const userEmail = req.user.email;
    console.log(userId);
    
    const result = await pool.query('SELECT name FROM users WHERE id = $1', [userId]);
    const userName = result.rows[0].name;

    return res.json({ 
        message: "Dados secretos acessados com sucesso!",
        userName: userName,
        userEmail: userEmail,
        userId: userId,
        dataHora: new Date()
    });
})

export default router