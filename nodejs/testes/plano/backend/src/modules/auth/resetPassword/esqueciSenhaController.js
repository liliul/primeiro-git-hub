import { z } from "zod";
import EsqueciSenhaService from "./esqueciSenhaService.js";

export const validarEmailSchema = z.object({
	email: z.string().email("Email inválido"),
});

class EsqueciSenhaController {
	constructor(pool) {
		this.pool = pool;

		this.esqueciSenhaService = new EsqueciSenhaService(this.pool);
	}
    
	async forgotPassword(req, res) {
		const { email } = validarEmailSchema.parse(req.body);

		await this.esqueciSenhaService.forgotPasswordService(email);

		return res.status(200).json({
			message: "Se o email existir, você receberá instruções.",
		});
	}
}

export default EsqueciSenhaController;
