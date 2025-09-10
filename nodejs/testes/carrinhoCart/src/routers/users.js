import express from 'express'
import db from '../db/indexDB.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
dotenv.config();

const routerUsers = express.Router()

routerUsers.post('/create-users', async (req, res) => {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)
    
    const users = await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, passwordHash])

    res.status(200).json({ message: 'ok', data: users.result})    
})

routerUsers.post('/login', async (req, res) => {
    const { email, password} = req.body 

    const userDb = await db.query(`select id, name, email, password from users where email = $1 limit 1`, [email])
    
    if (userDb.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    
    const user = userDb.rows[0];
     
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
         return res.status(401).json({ error: "Senha incorreta" })
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES)
    })
    
    res.status(200).json({ message: token })
})

routerUsers.get('/list-users', async (req, res) => {
    const listUsers = await db.query(`
        select * from users;
    `)

    res.status(200).json({ message: 'ok', data: listUsers.rows })
})

routerUsers.delete('/delete-users/:id', async (req, res) => {
    const { id } = req.params

    const deleteUsers = await db.query(`
        delete from users where id = $1;
    `, [id])

    if (!deleteUsers) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'ok', data: deleteUsers})

})


export default routerUsers