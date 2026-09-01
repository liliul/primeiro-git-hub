import crypto from "crypto";
import { AppError } from "../../../errors/appErrors/index.js";
import logger from "../../../logger/pino.js";
import { emailUserSchema } from "./emailVerifiedSchema.js";
import MailResendEmailVerifiedService from "../../mail/services/MailResendEmailVerfifiedService.js";
import EmailVerificadoRepository from "./emailVerificadoRepository.js";
import path from "node:path";
import EmailVerifiedService from "./emailVerifiedService.js";

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

	async emailVerifield(req, res) {
		const { token } = req.query;

		if (!token || typeof token !== "string") {
			throw new AppError("Token é obrigatorio.", 400);
		}

		if (!/^[a-f0-9]{64}$/i.test(token)) {
			throw new AppError("Token inválido.", 400);
		}

		const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

		const buscaByToken =
			await this.emailVerificadoRepository.searchEmailVerificationTokensByTokenHash(
				tokenHash,
			);

		if (buscaByToken.length === 0) {
			throw new AppError("Token Invalido.");
		}

		const verification = buscaByToken;

		if (verification.expires_at < new Date()) {
			throw new AppError("Token expirado", 400);
		}

		const clients = await this.pool.connect();

		try {
			await clients.query(`BEGIN`);

			await this.emailVerificadoRepository.updateUserEmailVerificadoTransitionById(
				clients,
				verification.user_id,
			);

			await this.emailVerificadoRepository.deleteEmailVerificationtokensTransitionById(
				clients,
				verification.user_id,
			);

			await clients.query("COMMIT");

			// return res.status(200).json({message: 'Email verificado'})
			return res.sendFile(path.join(__dirname, "public/emailVerificado.html"));
		} catch (error) {
			await clients.query("ROLLBACK");
			throw error;
		} finally {
			clients.release();
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
