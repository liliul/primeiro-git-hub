import AssinaturaService from "../service/assinaturasService.js";

class AssinaturasController {
	constructor(pool) {
		this.pool = pool;

		this.assinaturaService = new AssinaturaService(this.pool);

		this.criandoAssinatura = this.criandoAssinatura.bind(this);
	}

	async criandoAssinatura(req, res) {
		const { planName } = req.body;
		const { id } = req.user;

		const criandoAssinatura = await this.assinaturaService.criandoAssinatura(
			planName,
			id,
		);

		const data = {
			assinatura: criandoAssinatura,
			plano: planName,
		};

		return res.status(201).json(data);
	}
}

export default AssinaturasController;
