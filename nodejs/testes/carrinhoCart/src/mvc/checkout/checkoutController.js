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
}

export default CheckoutController