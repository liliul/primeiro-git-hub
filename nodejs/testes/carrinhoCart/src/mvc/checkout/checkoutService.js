import CheckoutRepository from "./checkoutRepository.js"

class CheckoutService {
    constructor(db) {
        this.db = db 

        this.checkoutRepository = new CheckoutRepository(this.db)
    }

    async checkoutService(userId) {
        const cart = await this.checkoutRepository.checkoutCart(userId)
        
         if (cart.rows.length === 0) {
                throw new Error("Carrinho vazio")
            }

        const total = cart.rows.reduce((sum, item) => sum + item.price * item.quantity,0)

        const orders = await this.checkoutRepository.popularOrders(userId, total)
          
        const order = orders.rows ? orders.rows[0] : orders[0]
                       
        for (const item of cart.rows) {
            await this.checkoutRepository.updateStock(item.quantity, item.id)   
            
            await this.checkoutRepository.popularOrderItems(
                order.id,
                item.id,
                item.quantity,
                item.price
            )
        }
        
        await this.checkoutRepository.deleteCartItems(cart.rows[0].cart_id)

        const paymentSuccess = true

        if (paymentSuccess) {
            await this.checkoutRepository.updateOrders("paid", orders.rows[0].id)
        }

        return order
    }
}

export default CheckoutService