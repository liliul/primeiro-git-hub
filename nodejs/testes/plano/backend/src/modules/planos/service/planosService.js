import { AppError } from "../../../errors/appErrors/index.js";
import PlanosRepository from "../repository/planosRepository.js";
import AuditoriaController from "../../auditoria/auditoriaController.js";

class PlanosService {
	constructor(pool) {
		this.pool = pool;

		this.planosRepository = new PlanosRepository(this.pool);
		this.auditoriaController = new AuditoriaController(this.pool);
	}

	async criandoNovoPlano(name, price, duration_days, metadata) {
		try {
			const verificarPlanoExiste =
				await this.planosRepository.buscaPlanosByName(name);

			if (verificarPlanoExiste) {
				throw new AppError("Plano com esse nome já existe.", 409);
			}

			const planoNovo = await this.planosRepository.criandoNovoPlano({
				name,
				price,
				duration_days,
			});

			if (!planoNovo) {
				throw new AppError("Falha ou criar plano.", 500);
			}

			await this.auditoriaController.auditoriaSegura({
				userId: metadata.id,
				action: "CREATED_NEW_PLAN",
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			return planoNovo;
		} catch (error) {
			await this.auditoriaController.auditoriaSegura({
				userId: metadata.id,
				action: "ERROR_CREATED_NEW_PLAN",
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			throw error;
		}
	}
}

export default PlanosService;
