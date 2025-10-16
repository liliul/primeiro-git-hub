import { Request, Response } from "express";
import { pool } from "../config/db";
import { TokenPayload } from "../types";

export async function rolesController(req: Request, res: Response) {

       try {

        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }

        const paramsId = req.params?.id; 
        const { role } = req.body;
        const reqUsuario: TokenPayload = req.user;
        
        const validarRole = validadandoRoles(role);
        
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
        
        const verificadoAdmins = verificarAdmins(reqUsuario, paramsId, res)
        if (!verificadoAdmins) {
            return
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
}

function validadandoRoles(reqbody: string): boolean {
    const rolesExistente: string[] = ['user', 'moderador', 'admin'];
    const virificar = rolesExistente.includes(reqbody);

    return virificar;
}

interface Iusuario extends Omit<TokenPayload, 'name' | 'email'> {
    role: string
    id: string
}

function verificarAdmins(usuario: Iusuario, paramsId: any, res: any): boolean {
    if (usuario.role === 'superAdmin' && usuario.id === paramsId) {
        res.status(403).json({ error: 'superAdmin não pode alterar a sua role.'})
        return false
    }
    return true
}