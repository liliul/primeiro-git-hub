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

routerCartItems.put("/update-cart-items/:idItems", async (req, res) => {
  const { idItems } = req.params;
  const { quantity } = req.body;

  try {
    const result = await db.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, idItems]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item não encontrado" });
    }

    res.json(result.rows[0]);
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