import { AppError } from "../../../../errors/appErrors/index.js";
import AuditoriaService from "../../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../../auditoria/domain/auditoriaActive.js";
import { RoleSchema, uuidSchema } from "../models/zodSchema.js";

class SuperAdminController {
	constructor(pool) {
		this.pool = pool;

		this.auditoriaService = new AuditoriaService(this.pool);
	}

	async alterarRole(req, res) {
		const userId = uuidSchema.parse(req.user.id);
		const id = uuidSchema.parse(req.params.id);
		const roles = RoleSchema.parse(req.body.roles);

		if (userId === id) {
			throw AppError("ErrorRole Não é permitido alterar a própria role", 403);
		}

		await this.pool.query(`UPDATE users SET roles = $1 WHERE id = $2`, [
			roles,
			id,
		]);

		try {
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
		} catch (error) {
			console.warn("Falha ao registrar auditoria ROLE_CHANGED", error);
		}

		res.status(200).send();
	}
}

export default SuperAdminController;
