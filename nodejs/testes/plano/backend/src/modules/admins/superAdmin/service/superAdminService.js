import { AppError } from "../../../../errors/appErrors/index.js";
import AuditoriaService from "../../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../../auditoria/domain/auditoriaActive.js";
import { RoleSchema, uuidSchema } from "../models/zodSchema.js";
import SuperAdminRepository from "../repository/superAdminRepository.js";

class SuperAdminService {
	constructor(pool) {
		this.pool = pool;

		this.auditoriaService = new AuditoriaService(pool);
		this.superAdminRepository = new SuperAdminRepository();
	}

	async alterarRole(req) {
		const userId = uuidSchema.parse(req.user.id);
		const id = uuidSchema.parse(req.params.id);
		const roles = RoleSchema.parse(req.body.roles);

		if (userId === id) {
			req.logger.warn({
				event: "CONFICT_ID_FAIL",
				userId: userId,
			});

			throw AppError("ErrorRole Não é permitido alterar a própria role", 403);
		}

		const client = await this.pool.connect();

		try {
			await client.query("BEGIN");

			await this.superAdminRepository.updateRole(client, id, roles);

			await this.auditoriaService.log({
				userId: userId,
				action: AuditoriaAction.ROLE_CHANGED,
				metadata: {
					id,
					newRole: roles,
				},
				ip: req.ip,
				userAgent: req.headers["user-agent"],
			});

			await client.query("COMMIT");

			req.logger.info({
				event: "ROLE_CHANGED_SUCCESS",
				userId: id,
			});
		} catch (error) {
			await client.query("ROLLBACK");

			console.warn("Falha ao registrar auditoria ROLE_CHANGED", error);

			req.logger.warn({
				event: "ROLE_CHANGED_FAIL",
				userId: id,
			});

			throw error;
		} finally {
			client.release();
		}
	}
}

export default SuperAdminService;
