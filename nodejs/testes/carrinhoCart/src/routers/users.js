import express from 'express'
import db from '../db/indexDB.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { authRoles } from '../middleware/roles.js'
import AuthorizationJwt from '../middleware/auth.js'

const routerUsers = express.Router()

routerUsers.post('/create-users', async (req, res) => {
    const { name, email, password } = req.body
    const role = 'user'

    const passwordHash = await bcrypt.hash(password, 10)
    
    const users = await db.query(`INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4);`, [name, email, passwordHash, role])

    res.status(200).json({ message: 'ok', data: users.result})    
})

routerUsers.post('/login', async (req, res) => {
    const { email, password} = req.body 

    const userDb = await db.query(`select id, name, email, password, role from users where email = $1 limit 1`, [email])
    
    if (userDb.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    
    const user = userDb.rows[0];
     
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
         return res.status(401).json({ error: "Senha incorreta" })
    }

    const payload = { 
        id: user.id,
        name: user.name, 
        email: user.email, 
        role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES)
    })
    
    res.status(200).json({ message: token })
})

routerUsers.get('/list-users', AuthorizationJwt, authRoles.isAdmin, async (req, res) => {
    const listUsers = await db.query(`
        select * from users;
    `)

    res.status(200).json({ message: 'ok', data: listUsers.rows })
})

routerUsers.delete('/delete-users/:id', AuthorizationJwt, authRoles.isSuperAdmin, async (req, res) => {
    const { id } = req.params

    const deleteUsers = await db.query(`
        delete from users where id = $1;
    `, [id])

    if (!deleteUsers) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'ok', data: deleteUsers})

})

routerUsers.put('/update-users/:id', AuthorizationJwt, authRoles.isAuthenticated, async (req, res) => {
    const { id } = req.params
    const { name, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const userUpdate = await db.query(`UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *`,
        [name, passwordHash, id]
    )

    if (userUpdate.rowCount === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ 
        message: 'Usuário atualizado com sucesso.',
        user: userUpdate.rows[0]
    })
})

export default routerUsers