import express from 'express'
import db from '../db/indexDB.js'

const routerCartItems = express.Router()

routerCartItems.get('/list-cart-items', async (req, res) => {
    const listCartItems = await db.query(`
        select * from cart_items;
    `)

    res.status(200).json({ message: 'ok', data: listCartItems.rows })

})

routerCartItems.get('/list-cart-items/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const cart = await db.query(
        `SELECT ci.id as item_id, p.name, p.price, ci.quantity,
                (p.price * ci.quantity) as subtotal
        FROM cart_items ci
        JOIN carts c ON ci.cart_id = c.id
        JOIN products p ON ci.product_id = p.id
        WHERE c.user_id = $1`,
        [id]
        );

        res.json(cart.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao listar carrinho" });
    }
})

export default routerCartItems