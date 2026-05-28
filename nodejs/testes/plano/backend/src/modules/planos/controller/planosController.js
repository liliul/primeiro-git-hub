import PlanosService from "../service/planosService.js"

class PlanoController {
    constructor(pool) {
        this.pool = pool

        this.planosService = new PlanosService(this.pool)

        this.criandoNovoPlano = this.criandoNovoPlano.bind(this)
    }

    async criandoNovoPlano(req, res) {
        const { name, price, duration_days} = req.body
        
        const result = await this.planosService.criandoNovoPlano(name, price, duration_days)

        res.status(201).json({ message: 'Plano criado com sucesso.', data: result })
    }
}

export default PlanoController