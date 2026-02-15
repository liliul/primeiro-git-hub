import z from "zod";
import { AppError } from "../../../errors/appErrors/index.js";
import RestaurarSenhaService from "./restaurarSenhaService.js";

export const updatePasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8)
		.regex(/[A-Z]/, "Precisa de letra maiúscula")
		.regex(/[0-9]/, "Precisa de número"),
});

class RestaurarSenhaController {
	constructor(pool) {
		this.pool = pool;

		this.restaurarSenhaService = new RestaurarSenhaService(this.pool);
	}

	async resetPassword(req, res) {
		const { newPassword } = updatePasswordSchema.parse(req.body);
		
		const token = req.body.token
		
		if (!token) {
  throw new AppError("Token não informado", 401);
}
		await this.restaurarSenhaService.resetPasswordService(token, newPassword);

		return res.status(204).send();
	}
}

export default RestaurarSenhaController;
