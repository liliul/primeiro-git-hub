import { roleSchema, userIdParamSchema } from "./superAdminDTO.js"

class SuperAdminController {
    constructor(db) {
        this.db = db 
    }

    async newRoles(req, res) {
        const userIdAltered = userIdParamSchema.safeParse(req.params)
        if (!userIdAltered.success) {
            return res.status(400).json({ 
                message: 'Erro no id do usuario asser alterado. ', 
                errors: userIdAltered.error.errors 
            })
        }
        const { id } = userIdAltered.data
        
        if (id === req.user.id && req.user.role === 'super-admin') {
            return res.status(400).json({ 
                message: 'Erro sem permissão para alterar super-admin'
            })
        }
        
        const newRoles = roleSchema.safeParse(req.body)
        if (!newRoles.success) {
            return res.status(400).json({ 
                message: 'Erro na role passar o nome correto da role', 
                errors: newRoles.error.errors 
            })
        }
        const { role } = newRoles.data
       
        const isUserAlteredId = await this.db.query(`select role from users where id = $1`,
            [id]
        )
        
        if (isUserAlteredId.rows.length === 0) {
            throw new Error("Sem o usuario asser alterado")
        }
        
        const isUpdateRoles = await this.db.query(`update users set role = $1 where id = $2`,
            [role, id]
        )
        
        if (isUpdateRoles.rowCount.length === 0) {
            return res.status(404).json({ 
                message: 'Erro na hora de atualizar a role do usuario.' 
            })
        }

        res.status(200).json({ 
            message: `Roles alterada com sucesso!`
        })
    }
}

export default SuperAdminController