import PlanosService from "../service/planosService.js";
import { criandoPlanoSchema } from "../schemas/planosSchemas.js";

class PlanoController {
	constructor(pool) {
		this.pool = pool;

		this.planosService = new PlanosService(this.pool);

		this.criandoNovoPlano = this.criandoNovoPlano.bind(this);
	}

	async criandoNovoPlano(req, res) {
		const { name, price, duration_days } = criandoPlanoSchema.parse(req.body);

		const metadata = {
			id: req.user.id,
			ip: req.ip,
			userAgent: req.headers["user-agent"],
			roles: req.user.roles,
		};

		try {
			const plano = await this.planosService.criandoNovoPlano(
				name,
				price,
				duration_days,
				metadata,
			);

			req.logger.info({
				event: "CREATED_NEW_PLAN",
				userId: metadata.id,
				plan: name,
				roles: metadata.roles,
			});

			return res
				.status(201)
				.json({ message: "Plano criado com sucesso.", data: plano });
		} catch (error) {
			req.logger.error({
				event: "ERROR_CREATED_NEW_PLAN",
				userId: metadata.id,
				plan: name,
				roles: metadata.roles,
				message: error.message,
			});

			return res.status(error.statusCode || 500).json({
				message: error.message,
			});
		}
	}
}

export default PlanoController;
