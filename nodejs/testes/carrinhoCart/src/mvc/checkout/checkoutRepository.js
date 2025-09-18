class CheckoutRepository {
    constructor(db) {
        this.db = db 
    }

    async checkoutCart(userId) {
        return await this.db.query(
            `SELECT p.id, p.price, ci.quantity, c.id as cart_id
            FROM cart_items ci
            JOIN carts c ON ci.cart_id = c.id
            JOIN products p ON ci.product_id = p.id
            WHERE c.user_id = $1`,
            [userId]
        )
    }

    async popularOrders(userId, total) {
        return await this.db.query(
            "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
            [userId, total]
        )
    }

    async updateStock(quantity, productsId) {
        return await this.db.query(
            "UPDATE products SET stock = stock - $1 WHERE id = $2",
            [quantity, productsId]
        )
    }

    async popularOrderItems(orderId, productsId, quantity, price) {
        return await this.db.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ($1, $2, $3, $4)`,
            [orderId, productsId, quantity, price]
        )
    }

    async deleteCartItems(cartId) {
        return await this.db.query(
            `DELETE FROM cart_items WHERE cart_id = $1`, 
            [cartId,]
        )
    }

    async updateOrders(paid, ordersId) {
        return await this.db.query(
            "UPDATE orders SET status = $1 WHERE id = $2",
            [paid, ordersId]
        )
    }
}

export default CheckoutRepository