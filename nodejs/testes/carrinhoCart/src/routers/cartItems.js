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
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        message: "ID ausente",
        err: `id recebido: ${id}`
      });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        message: 'ID inválido para listar cart items',
        err: `id que você enviou: ${id}`
      })
    }

    const cart = await db.query(
    `SELECT ci.id as item_id, p.id as product_id, p.name, p.price, ci.quantity,
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

routerCartItems.put("/update-cart-items/:idItems/:idProduct", async (req, res) => {

  try {
    const { idItems, idProduct } = req.params;
    const { quantity } = req.body;
    
    const selectProductStock = await db.query(`
      select stock from products where id = $1      
    `, [idProduct])

    if (selectProductStock.rowCount === 0) {
      return res.status(404).json({ error: "Item não encontrado no stock" });
    }

    const quantidade = Number(quantity)
    const stock = Number(selectProductStock.rows[0].stock)
    
    if (quantidade > stock) {
      res.status(400).json({ error: "Tem mais quantidade de produto do que no stock" })
      return
    }
   
    const result = await db.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, idItems]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.status(200).json({ message: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
})

routerCartItems.delete("/delete-cart-items/:idItems", async (req, res) => {
  const { idItems } = req.params;

  try {
    const result = await db.query("DELETE FROM cart_items WHERE id = $1", [idItems]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.json({ message: "Item removido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover item" });
  }
})

export default routerCartItems