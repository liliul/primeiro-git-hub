import express from 'express'
import db from '../db/indexDB.js'

const routerProducts = express.Router()

routerProducts.post('/create-products', async (req, res) => {
    const { name, price, stock } = req.body

    const users = await db.query(`
        INSERT INTO products (name, price, stock) 
        VALUES ($1, $2, $3);
        `, [name, price, stock])

    console.log(users);
    res.status(200).json({ message: 'ok', data: users })
    
})

routerProducts.get('/list-products', async (req, res) => {
    const listUsers = await db.query(`
        select * from products;
    `)

    res.status(200).json({ message: 'ok', data: listUsers.rows })
})

routerProducts.delete('/delete-products/:id', async (req, res) => {
    const { id } = req.params

    const deleteProducts = await db.query(`
        delete from products where id = $1;
    `, [id])

    if (!deleteProducts) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'Deletado com sucesso ok'})

})

routerProducts.put('/update-products/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, stock } = req.body 

    const updateProducts = await db.query(`
        update products set 
            name = $1, price = $2, stock = $3 
            where id = $4
    `, [name, price, stock, id])

    if (!updateProducts) {
        return res.status(400).json({ message: 'erro no update' })
    }

    res.status(200).json({ message: 'Atualizado com sucesso ok'})

})


export default routerProducts