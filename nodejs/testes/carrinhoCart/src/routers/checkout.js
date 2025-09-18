import express from 'express'
import db from '../db/indexDB.js'
import AuthorizationJwt from '../middleware/auth.js'
import CheckoutController from '../mvc/checkout/checkoutController.js'

const routerCheckout = express.Router()

const checkout = new CheckoutController(db)

routerCheckout.post("/checkout/", 
  AuthorizationJwt,
  checkout.checkoutController.bind(checkout)
)

routerCheckout.get('/checkout/orders/', AuthorizationJwt, async (req, res) => {
  const listCheckout = await db.query(`
    select * from orders;    
  `)

  res.status(200).json({ message: 'listando checkout', data: listCheckout.rows})
})

routerCheckout.get('/checkout/', AuthorizationJwt, async (req, res) => {
  try {
    const userId = req.user.id;

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

routerCheckout.put('/checkout/:orderId/status', AuthorizationJwt, async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id; 
  const { status } = req.body;

  const validStatus = ["pending", "paid", "shipped", "completed", "canceled"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  const dbUser = await db.query("UPDATE orders SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [status, orderId, userId]);

  if (dbUser.rows.length === 0) {
    return res.status(404).json({ error: "Pedido não encontrado ou não pertence ao usuário" });
  }

  res.json({ message: "Status atualizado" });
});



export default routerCheckout