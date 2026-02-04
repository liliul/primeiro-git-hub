import HealthRepository from "./healthRepository.js";

class HealthController {
	constructor(pool) {
		this.pool = pool;
		this.healthRepository = new HealthRepository(this.pool);
	}

	async healthCheck(req, res) {
		try {
			const db = await this.healthRepository.checkDatabase();

			return res.json({
				status: "ok",
				database: db,
			});
		} catch (error) {
			console.error(error);

			return res.status(500).json({
				status: "error",
				message: "Erro interno",
			});
		}
	}
}

export default HealthController;
