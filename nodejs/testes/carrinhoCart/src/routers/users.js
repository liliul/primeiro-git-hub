import express from 'express'
import db from '../db/indexDB.js'

const routerUsers = express.Router()

routerUsers.post('/create-users', async (req, res) => {
    const { name, email } = req.body

    const users = await db.query(`INSERT INTO users (name, email) VALUES ($1, $2);`, [name, email])

    console.log(users);
    res.status(200).json({ message: 'ok', data: users.result})
    
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