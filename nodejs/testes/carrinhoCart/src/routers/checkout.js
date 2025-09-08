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

    
    // for (const item of cart.rows) {
    //   await db.query(
    //     "UPDATE products SET stock = stock - $1 WHERE id = $2",
    //     [item.quantity, item.id]
    //   );
    // }

    for (const item of cart.rows) {
      await db.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.id]
      );

      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)`,
        [order.rows[0].id, item.id, item.quantity, item.price]
      )
    }

    await db.query("DELETE FROM cart_items WHERE cart_id = $1", [
      cart.rows[0].cart_id,
    ]);

    // simula pagamento
    const paymentSuccess = true

    if (paymentSuccess) {
      await db.query(
        "UPDATE orders SET status = $1 WHERE id = $2",
        ["paid", order.rows[0].id]
      );
    }

    res.json({ message: "Pedido criado com sucesso", order: order.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no checkout" });
  }
})

routerCheckout.get('/checkout/orders/', async (req, res) => {
  const listCheckout = await db.query(`
    select * from orders;    
  `)

  res.status(200).json({ message: 'listando checkout', data: listCheckout.rows})
})

routerCheckout.get('/checkout/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await db.query(`
      SELECT o.id as order_id, o.total, o.status, o.created_at,
             oi.product_id, p.name, oi.quantity, oi.price
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [userId]);

    res.json({ message: 'Histórico de pedidos', data: orders.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar pedidos" });
  }
});

routerCheckout.put('/checkout/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatus = ["pending", "paid", "shipped", "completed", "canceled"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  await db.query("UPDATE orders SET status = $1 WHERE id = $2", [status, orderId]);

  res.json({ message: "Status atualizado" });
});



export default routerCheckout