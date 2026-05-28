import AssinaturaService from "../service/assinaturasService.js";

class AssinaturasController {
	constructor(pool) {
		this.pool = pool;

		this.assinaturaService = new AssinaturaService(this.pool);

		this.criandoAssinatura = this.criandoAssinatura.bind(this);
	}

	async criandoAssinatura(req, res) {
		const { planName } = req.body;
		const { id, roles } = req.user;
		const metadata = {
			ip: req.ip,
			userAgent: req.headers["user-agent"],
		};

		try {
			const criandoAssinatura = await this.assinaturaService.criandoAssinatura(
				planName,
				id,
				roles,
				metadata,
			);

			const data = {
				assinatura: criandoAssinatura,
				plano: planName,
			};

			req.logger.info({
				event: "SUBSCRIPTION_CREATED",
				userId: id,
				plan: planName,
				roles: roles,
			});

			return res.status(201).json(data);
		} catch (error) {
			console.error("Erro na criação da assinatura.", error);

			req.logger.error({
				event: "SUBSCRIPTION_CREATED_ERROR",
				userId: id,
				plan: planName,
				roles: roles,
				message: error.message,
			});

			return res.status(error.statusCode || 500).json({
				message: error.message,
			});
		}
	}
}

export default AssinaturasController;
