import { AppError } from "../../../errors/appErrors/index.js";
import RestaurarSenhaService from "./restaurarSenhaService.js";
import { updatePasswordSchema } from "./schemaZod.js";

class RestaurarSenhaController {
	constructor(pool) {
		this.pool = pool;

		this.restaurarSenhaService = new RestaurarSenhaService(this.pool);
	}

	async resetPassword(req, res) {
		const { newPassword } = updatePasswordSchema.parse(req.body);

		const token = req.body.token;

		if (!token) {
			throw new AppError("Token não informado", 401);
		}
		await this.restaurarSenhaService.resetPasswordService(token, newPassword);

		return res.status(204).send();
	}
}

export default RestaurarSenhaController;
