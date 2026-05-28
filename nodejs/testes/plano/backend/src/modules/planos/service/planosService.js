import PlanosRepository from "../repository/planosRepository.js"

class PlanosService {
    constructor(pool) {
        this.pool = pool

        this.planosRepository = new PlanosRepository(this.pool)
    }

    async criandoNovoPlano(name, price, duration_days) {
        const plano = await this.planosRepository.criandoNovoPlano({name, price, duration_days})
        
        if (!plano) {
            throw new Error('Falha ou criar plano.')
        }

        return plano
    }
}

export default PlanosService