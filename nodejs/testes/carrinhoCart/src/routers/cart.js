import express from 'express'
import db from '../db/indexDB.js'

const routeCarts = express.Router()

routeCarts.post('/create-carts-users/:id', async (req, res) => {
    const { id } = req.params
    const { productId, quantity } = req.body;
    
    let carts = await db.query("SELECT * FROM carts WHERE user_id = $1 limit 1", [id]);
    
    if (carts.rows.length === 0) {
        carts = await db.query(`
        INSERT INTO carts (user_id) 
        VALUES ($1) returning *;
        `, [id])

    }

    const cartsId = carts.rows[0].id

    const product = await db.query("SELECT stock FROM products WHERE id = $1", [productId]);
    if (product.rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    if (product.rows[0].stock < quantity) {
      return res.status(400).json({ error: "Estoque insuficiente" });
    }

    const item = await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id)
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
       RETURNING *`,
      [cartsId, productId, quantity]
    );

    res.status(200).json({ message: 'Create carts ok', data: item.rows })    
})

routeCarts.get('/list-carts', async (req, res) => {
    const listCarts = await db.query(`
        select * from carts;
    `)

    res.status(200).json({ message: 'ok', data: listCarts.rows })
})

routeCarts.delete('/delete-carts/:id', async (req, res) => {
    const { id } = req.params

    const deleteProducts = await db.query(`
        delete from carts where id = $1;
    `, [id])

    if (!deleteProducts) {
        return res.status(400).json({ message: 'erro no delete' })
    }

    res.status(200).json({ message: 'Deletado com sucesso ok'})

})

routeCarts.put('/update-products/:id', async (req, res) => {
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


export default routeCarts