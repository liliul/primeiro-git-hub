import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { pool } from "../config/db";
import { UsuarioRoles } from "../middleware/roles.middleware";
import { rolesController } from "../controller/roles.controller";

const router = Router()

router.get('/home', authenticateToken, UsuarioRoles('user', 'moderador', 'admin', 'superAdmin'), async (req: Request, res: Response) => {
    
    if (!req.user?.id) {
        console.log(req.user?.id);
        
        return res.status(401).json({ message: "Usuário sem autorização." });
    }

    const userId = req.user.id;
    const userEmail = req.user.email;
    const userrole = req.user?.role;
    console.log('id home',userId, userrole);
    
    const result = await pool.query('SELECT name FROM users WHERE id = $1', [userId]);
    const userName = result.rows[0].name;

    return res.json({ 
        message: "Dados secretos acessados com sucesso!",
        userName: userName,
        userEmail: userEmail,
        userId: userId,
        roles: userrole,
        dataHora: new Date()
    });
})

router.put('/nova-role/:id', 
    authenticateToken, 
    UsuarioRoles('superAdmin'),
    rolesController 
)

router.get('/private', authenticateToken, UsuarioRoles('admin', 'superAdmin'), async (req: Request, res: Response) => {
    if (!req.user?.role) {
        console.log('role private', req.user?.role);
        
        return res.status(401).json({ error: "Usuário não autenticado após middleware." });
    }

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user?.id]);
    const userName = result.rows[0];

    return res.json({ 
        message: "Dados rota privada!",
        userName: userName.name,
        userEmail: userName.email,
        userId: userName.id,
        userRole: userName.roles,
        dataHora: new Date()
    });
})


export default router