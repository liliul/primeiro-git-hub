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
			roles: roles
		})
		
		return res.status(201).json(data);
	}
}

export default AssinaturasController;
