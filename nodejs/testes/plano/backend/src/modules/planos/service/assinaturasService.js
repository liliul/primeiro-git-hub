import { AppError } from "../../../errors/appErrors/index.js";
import AssinaturasRepository from "../repository/assinaturasRepository.js";
import PlanosRepository from "../repository/planosRepository.js";

class AssinaturaService {
	constructor(pool) {
		this.pool = pool;

		this.planosRepository = new PlanosRepository(this.pool);
		this.assinaturasRepository = new AssinaturasRepository(this.pool);
	}

	async criandoAssinatura(planName, id) {
		const planos = await this.planosRepository.buscaPlanosByName(planName);

		if (!planos) {
			throw new AppError("Plano não encontrado.", 404);
		}

		let expiresAt = null;

		if (planos.duration_days) {
			expiresAt = new Date(
				Date.now() + planos.duration_days * 24 * 60 * 60 * 1000,
			);
		}

		await this.assinaturasRepository.desativarStatus(id);

		const criandoAssinatura =
			await this.assinaturasRepository.criandoAssinaturas(
				id,
				planos.id,
				expiresAt,
			);

		if (!criandoAssinatura) {
			throw new AppError("Assinatura ativa não encontrada.", 404);
		}

		return criandoAssinatura;
	}
}

export default AssinaturaService;
