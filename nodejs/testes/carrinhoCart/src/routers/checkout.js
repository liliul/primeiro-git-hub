import express from 'express'
import db from '../db/indexDB.js'

const routerCheckout = express.Router()

routerCheckout.post("/checkout/:idUsers", async (req, res) => {
  const id  = req.params.idUsers
    
  try {
    const cart = await db.query(
      `SELECT p.id, p.price, ci.quantity, c.id as cart_id
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1`,
      [id]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    const total = cart.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await db.query(
      "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
      [id, total]
    );

    
    for (const item of cart.rows) {
      await db.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.id]
      );
    }

    await db.query("DELETE FROM cart_items WHERE cart_id = $1", [
      cart.rows[0].cart_id,
    ]);

    res.json({ message: "Pedido criado com sucesso", order: order.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no checkout" });
  }
});

export default routerCheckout