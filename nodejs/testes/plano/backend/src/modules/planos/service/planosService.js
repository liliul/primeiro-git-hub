import { AppError } from "../../../errors/appErrors/index.js";
import PlanosRepository from "../repository/planosRepository.js";
import AuditoriaController from "../../auditoria/auditoriaController.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";

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
				action: AuditoriaAction.CREATED_NEW_PLAN,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			return planoNovo;
		} catch (error) {
			await this.auditoriaController.auditoriaSegura({
				userId: metadata.id,
				action: AuditoriaAction.ERROR_CREATED_NEW_PLAN,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			throw error;
		}
	}

	async buscandoTodosPlanos() {
		const buscandoPlanos = await this.planosRepository.buscandoTodosPlanos();

		if (!buscandoPlanos || buscandoPlanos === 0) {
			throw new AppError("Busca pelos planos falhou ou vazia.", 500);
		}

		return buscandoPlanos;
	}

	async atualizarPlano(name, price, duration_days, planoId) {
		if (name !== undefined) {
			const verificaNomePlano =
				await this.planosRepository.buscaPlanosByName(name);

			if (verificaNomePlano && verificaNomePlano.id !== planoId) {
				throw new AppError("Nome do plano já existe.", 409);
			}
		}

		const data = Object.fromEntries(
			Object.entries({
				name,
				price,
				duration_days,
			}).filter(([, value]) => value !== undefined),
		);

		const atualizarPlano = await this.planosRepository.atualizarPlanoById(
			planoId,
			data,
		);

		if (!atualizarPlano || atualizarPlano === 0) {
			throw new AppError("Falha ao atualizar plano.", 500);
		}

		return atualizarPlano;
	}
}

export default PlanosService;
