import CheckoutService from "./checkoutService.js"

class CheckoutController {
    constructor(db) {
        this.db = db 

        this.checkoutService = new CheckoutService(this.db)
    }
    
    async checkoutController(req, res)  {
        const userId = req.user.id
            
        try {
            const order = await this.checkoutService.checkoutService(userId)

            res.json({ message: "Pedido criado com sucesso", order: order })

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro no checkout" })
        }
    }

    async searchCheckoutOrders(req, res) {
        const selectOrders = await this.db.query(`
            select * from orders;`
        )

        res.status(200).json({ message: 'Listando Orders', data: selectOrders.rows})
    }

    async searchCheckoutOrdersId(req, res) {
        try {
            const userId = req.user.id;

            const orders = await this.db.query(`
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
    }

    async updateCheckoutOrderIdStatus(req, res) {
        const userId = req.user.id 
        const { orderId } = req.params
        const { status } = req.body

        const validStatus = ["pending", "paid", "shipped", "completed", "canceled"]
        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: "Status inválido" })
        }

        const orders = await this.db.query("UPDATE orders SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
            [status, orderId, userId]
        )

        if (orders.rows.length === 0) {
            return res.status(404).json({ error: "Pedido não encontrado ou não pertence ao usuário" })
        }

        res.json({ message: "Status atualizado" })
    }

}

export default CheckoutController