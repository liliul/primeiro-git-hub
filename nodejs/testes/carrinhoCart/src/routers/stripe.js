import express from "express";
import db from "../db/indexDB.js";
import Stripe from "stripe";

const routerCheckout = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Criar checkout com Stripe
routerCheckout.post("/checkout/:idUsers", async (req, res) => {
  const userId = req.params.idUsers;

  try {
    // Buscar carrinho do usuário
    const cart = await db.query(
      `SELECT p.id as product_id, p.name, p.price, ci.quantity, c.id as cart_id
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio" });
    }

    // Calcular total
    const total = cart.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Criar pedido no banco
    const order = await db.query(
      "INSERT INTO orders (user_id, total, status) VALUES ($1, $2, $3) RETURNING *",
      [userId, total, "pending"]
    );

    // Criar sessão de pagamento no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // ou pix, boleto dependendo da sua conta Stripe BR
      line_items: cart.rows.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:3000/success?orderId=${order.rows[0].id}`,
      cancel_url: `http://localhost:3000/cancel?orderId=${order.rows[0].id}`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao iniciar checkout" });
  }
});

// Webhook do Stripe (confirmação do pagamento)
routerCheckout.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.sendStatus(400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Recuperar orderId da success_url
    const url = new URL(session.success_url);
    const orderId = url.searchParams.get("orderId");

    // Atualizar pedido no banco como "paid"
    await db.query("UPDATE orders SET status = $1 WHERE id = $2", [
      "paid",
      orderId,
    ]);

    // Atualizar estoque e salvar items em order_items
    const orderItems = await db.query(
      `SELECT ci.product_id, ci.quantity, p.price, c.id as cart_id
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1`,
      [session.client_reference_id]
    );

    for (const item of orderItems.rows) {
      await db.query(
        "UPDATE products SET stock = stock - $1 WHERE id = $2",
        [item.quantity, item.product_id]
      );

      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await db.query("DELETE FROM cart_items WHERE cart_id = $1", [
      orderItems.rows[0].cart_id,
    ]);
  }

  res.json({ received: true });
});

export default routerCheckout;
