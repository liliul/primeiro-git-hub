import logger from "../../../logger/pino.js";
import { emailUserSchema } from "./emailVerificadoSchema.js";
import MailResendEmailVerifiedService from "../../mail/services/MailResendEmailVerfifiedService.js";
import EmailVerificadoRepository from "./emailVerificadoRepository.js";
import path from "node:path";
import EmailVerifiedService from "./emailVerificadoService.js";

const __dirname = path.resolve();

class EmailVerifiedController {
	constructor(pool) {
		this.pool = pool;

		this.emailVerifield = this.emailVerifield.bind(this);
		this.reenviarEmailVerificado = this.reenviarEmailVerificado.bind(this);

		this.mailResendEmailVerifiedService = new MailResendEmailVerifiedService(
			logger,
		);

		this.emailVerificadoRepository = new EmailVerificadoRepository(this.pool);
		this.emailVerifiedService = new EmailVerifiedService(this.pool);
	}

	async emailVerifield(req, res, next) {
		const { token } = req.query;

		try {
			await this.emailVerifiedService.emailVerifield(token);

			// return res.status(200).json({message: 'Email verificado'})
			return res.sendFile(path.join(__dirname, "public/emailVerificado.html"));
		} catch (error) {
			next(error);
		}
	}

	async reenviarEmailVerificado(req, res, next) {
		const { email } = emailUserSchema.parse(req.body);

		try {
			await this.emailVerifiedService.reenviarEmailVerificado(email);

			res.status(200).json({
				message:
					"Se existir uma conta e ela ainda não estiver verificada, um novo e-mail será enviado.",
			});
		} catch (error) {
			next(error);
		}
	}
}
export default EmailVerifiedController;
