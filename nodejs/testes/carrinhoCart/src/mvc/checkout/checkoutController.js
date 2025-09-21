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
            select
            (select u.name from users as u where u.id = o.user_id) as user_name,
            (select u.email from users as u where u.id = o.user_id) as user_email, 
            id, user_id, total, status, created_at
            from orders as o
            `
        )

        res.status(200).json({ message: 'Listando Orders', count: selectOrders.rows.length, data: selectOrders.rows})
    }

    async searchCheckoutOrdersCursorPages(req, res) {

        try {
            const { cursor_created_at, cursor_id, limit = 5, direction = "next" } = req.query

            const pageLimit = parseInt(limit, 10)
            const createdAt = cursor_created_at ? new Date(cursor_created_at) : null
            const id = cursor_id || null

            let query = `
                SELECT 
                    (SELECT u.name FROM users u WHERE u.id = o.user_id) AS user_name,
                    (SELECT u.email FROM users u WHERE u.id = o.user_id) AS user_email,
                    o.id, o.user_id, o.total, o.status, o.created_at
                FROM orders o
            `
            let params = []

            if (createdAt && id) {
            if (direction === "next") {
                query += `WHERE (o.created_at, o.id) < ($1, $2) `
                params = [createdAt, id]
            } else {
                query += `WHERE (o.created_at, o.id) > ($1, $2) `
                params = [createdAt, id]
            }
            }

            query += `ORDER BY o.created_at ${direction === "next" ? "DESC" : "ASC"},
                o.id ${direction === "next" ? "DESC" : "ASC"} 
                LIMIT $${params.length + 1}
            `

            params.push(pageLimit)

            const result = await this.db.query(query, params)

            let rows = result.rows

            if (direction === "prev") {
                rows = rows.reverse()
            }

            const nextCursor =
            rows.length > 0
                ? {
                    cursor_created_at: rows[rows.length - 1].created_at,
                    cursor_id: rows[rows.length - 1].id,
                }
                : null

            const prevCursor =
            rows.length > 0
                ? {
                    cursor_created_at: rows[0].created_at,
                    cursor_id: rows[0].id,
                }
                : null

            res.json({
                message: "Orders paginados",
                data: rows,
                nextCursor,
                prevCursor,
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Erro na paginação" })
        }
    }

    async searchCheckoutOrdersId(req, res) {
        try {
            const userId = req.user.id;

            const orders = await this.db.query(`
           SELECT o.id as order_id, o.total, o.status, o.created_at,
                    oi.product_id, p.name as nameProduct, oi.quantity, oi.price,
                    u.name as nameUser, u.email as emailUser
            FROM orders o
            JOIN order_items oi ON oi.order_id = o.id
            JOIN products p ON oi.product_id = p.id
			join users u on u.id = o.user_id 
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