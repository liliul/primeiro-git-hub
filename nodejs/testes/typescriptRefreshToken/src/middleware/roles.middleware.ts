import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";

function UsuarioRoles(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id
            // const userRoles = req.user?
            console.log(userId, roles);
            
            const selectRolesDb = await pool.query(`
                select roles from users where id = $1; 
            `, [userId])  
            
            if (selectRolesDb.rowCount === 0) {
                return next();
            }

            const userRoles = selectRolesDb.rows[0].roles;

            if (!userRoles) {
                return res.status(401).json({ error: 'Acesso negado'})
            }
            console.log(roles.includes(userRoles));
            
            if (roles.includes(userRoles)) {
                return next();
            }
                
            return res.status(403).json({ error: `Usuario com role (${userRoles}) sem acesso negado.`})
        
        } catch (error) {
            console.error(error);
        }
    }

}

export { UsuarioRoles }