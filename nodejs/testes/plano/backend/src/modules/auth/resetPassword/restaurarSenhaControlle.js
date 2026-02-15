import z from "zod";
import RestaurarSenhaService from "./restaurarSenhaService.js";

export const updatePasswordSchema = z.object({
	newpassword: z
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
		const { token, newPassword } = updatePasswordSchema.parse(req.body);

		await this.restaurarSenhaService.resetPasswordService(token, newPassword);

		return res.status(204).send();
	}
}

export default RestaurarSenhaController;
