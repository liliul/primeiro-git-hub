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

routerCheckout.get('/checkout/orders/', 
  AuthorizationJwt,
  checkout.searchCheckoutOrders.bind(checkout)
)

routerCheckout.get('/checkout-id', 
  AuthorizationJwt,
  checkout.searchCheckoutOrdersId.bind(checkout)
)

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