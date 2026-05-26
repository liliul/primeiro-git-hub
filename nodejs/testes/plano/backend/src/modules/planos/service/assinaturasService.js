import { AppError } from "../../../errors/appErrors/index.js";
import AssinaturasRepository from "../repository/assinaturasRepository.js";
import PlanosRepository from "../repository/planosRepository.js";
import GerandoJwtToken from "../../../utils/gerandoJwtToken.js";
import AuditoriaController from "../../auditoria/auditoriaController.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";

class AssinaturaService {
	constructor(pool) {
		this.pool = pool;

		this.planosRepository = new PlanosRepository(this.pool);
		this.assinaturasRepository = new AssinaturasRepository(this.pool);
		this.gerandoJwtToken = new GerandoJwtToken();
		this.auditoriaController = new AuditoriaController(this.pool);
	}

	async criandoAssinatura(planName, id, roles, metadata) {
		const client = await this.pool.connect();

		try {
			await client.query("BEGIN");

			const plano = await this.planosRepository.buscaPlanosByName(
				planName,
				client,
			);

			if (!plano) {
				throw new AppError("Plano não encontrado.", 404);
			}

			let expiresAt = null;

			if (plano.duration_days) {
				expiresAt = new Date(
					Date.now() + plano.duration_days * 24 * 60 * 60 * 1000,
				);
			}

			await this.assinaturasRepository.desativarStatus(id, client);

			const assinatura = await this.assinaturasRepository.criandoAssinaturas(
				id,
				plano.id,
				expiresAt,
				client,
			);

			if (!assinatura) {
				throw new AppError("Assinatura ativa não encontrada.", 404);
			}

			const newAccessToken = this.gerandoJwtToken.gerarAccessToken({
				id,
				roles,
				plano: plano.name,
			});

			await client.query("COMMIT");

			await this.auditoriaController.auditoriaSegura({
				userId: id,
				action: AuditoriaAction.PLAN_UPDATED,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			return {
				status: assinatura,
				newAccessToken,
			};
		} catch (error) {
			await client.query("ROLLBACK");

			await this.auditoriaController.auditoriaSegura({
				userId: id,
				action: AuditoriaAction.PLAN_UPDATE_ERROR,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
			});

			throw error;
		} finally {
			client.release();
		}
	}
}

export default AssinaturaService;
