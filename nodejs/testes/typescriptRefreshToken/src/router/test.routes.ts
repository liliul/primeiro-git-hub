import { Router, Request, Response } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { pool } from "../config/db";
import { UsuarioRoles } from "../middleware/roles.middleware";
import { TokenPayload } from "../types";

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

router.put('/nova-role/:id', 
    authenticateToken, 
    UsuarioRoles('admin','superAdmin'), 
    async (req: Request, res: Response) => {

       try {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        const paramsId = req.params?.id; 
        const { role } = req.body;

        
        const reqUsuario: TokenPayload = req.user;
        
        const validarRole = validadandoRoles(role)
        
        if (!validarRole) {
            return res.status(401).json({ error: 'Nome da role não existe.'})
        }

        /**
         * // verificando se o usuario existe no banco de dados 
         * @type {import('pg').QueryResult<{ paramsId: string }>}
         */
        const verificaUsuarioExiste = await pool.query(`
            select id, roles from users where id = $1;
        `,[paramsId]);

        if (verificaUsuarioExiste.rowCount === 0) {
            return res.status(401).json({ error: 'id não encontrado.'}) 
        }
        const usuarioVerificado = verificaUsuarioExiste.rows[0].id
        
        const verificadoAdmins = verificarAdmins(reqUsuario, verificaUsuarioExiste.rows[0].roles, paramsId, res)
        console.log('aa', verificadoAdmins);
        if (!verificadoAdmins) {
            return //res.status(401).json({ error: 'Verificação admis falhou.'})
        }

        /**
         * // atualiza roles do usuario no banco de dados 
         * @type {import('pg').QueryResult<{ role: string, usuarioVerificado: string }>}
         */
        const atualizandoRoles = await pool.query(`update users set roles = $1 where id = $2;`,
            [role, usuarioVerificado]
        )

        if (atualizandoRoles.rowCount === 0) {
            return res.status(401).json({ error: 'roles não atualizada.' })
        }
      
        return res.status(200).json({message: 'Roles atualizada com succeso.'})

       } catch (error) {
        console.error(error);
        return res.status(200).json({error: 'id ou roles errados', err: error})
       }
})

function validadandoRoles(reqbody: string): boolean {
    const rolesExistente: string[] = ['user', 'moderador', 'admin'];
    const virificar = rolesExistente.includes(reqbody);

    return virificar;
}

interface Iusuario extends Omit<TokenPayload, 'name' | 'email'> {
    role: string
    id: string
}

function verificarAdmins(usuario: Iusuario, rolesDB: string, paramsId: any, res: any): boolean {
    if (usuario.role === 'superAdmin' && usuario.id === paramsId) {
        res.status(403).json({ error: 'superAdmin não pode alterar a sua role.'})
        return false
    }
    if (usuario.role === 'admin' && rolesDB === 'superAdmin') {
        res.status(403).json({ error: 'admin não pode alterar a role do superAdmin.'})
        return false
    }
    if (usuario.role === 'admin' && usuario.id === paramsId) {
        res.status(403).json({ error: 'admin não pode alterar a sua role.'})
        return false
    }
    return true
}
export default router