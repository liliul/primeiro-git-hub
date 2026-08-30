import crypto from "crypto";
import logger from "../../../logger/pino.js";
import MailResendEmailVerifiedService from "../../mail/services/MailResendEmailVerfifiedService.js";
import { emailUserSchema, userIdSchema } from "./emailVerifiedSchema.js";
import EmailVerificadoRepository from "./emailVerificadoRepository.js";
import { AppError } from "../../../errors/appErrors/index.js";

class EmailVerifiedService {
	constructor(pool) {
		this.pool = pool;

		this.mailResendEmailVerifiedService = new MailResendEmailVerifiedService(
			logger,
		);

		this.emailVerificadoRepository = new EmailVerificadoRepository(this.pool);
	}

	async reenviarEmailVerificado(email) {
		const buscaUserByEmail =
			this.emailVerificadoRepository.searchUserByEmail(email);

		if (buscaUserByEmail.length === 0) {
			throw new AppError(
				"Se existir uma conta e ela ainda não estiver verificada, um novo e-mail será enviado.",
				200,
			);
		}
		const user = await buscaUserByEmail;

		if (user.email_verified) {
			throw new AppError("Se necessário, enviaremos um novo e-mail.", 200);
		}

		await this.emailVerificadoRepository.deleteEmailVerificationtokensById(
			user.id,
		);

		const token = crypto.randomBytes(32).toString("hex");

		const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

		const expireAt = new Date(Date.now() + 15 * 60 * 1000);

		await this.emailVerificadoRepository.createEmailVerifiedTokens(
			user.id,
			tokenHash,
			expireAt,
		);

		await this.mailResendEmailVerifiedService.sendEmailVerified(
			user.email,
			token,
		);
	}

	async verificationEmail(userId, email) {
		const user_id = userIdSchema.parse(userId);

		const email_verified = emailUserSchema.parse(email);

		const token = crypto.randomBytes(32).toString("hex");

		const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

		const expireAt = new Date(Date.now() + 15 * 60 * 1000);

		await this.emailVerificadoRepository.createEmailVerifiedTokens(
			user_id,
			tokenHash,
			expireAt,
		);

		await this.emailVerificadoRepository.updateEmailVerifiedFalse(user_id);

		await this.mailResendEmailVerifiedService.sendEmailVerified(
			email_verified,
			token,
		);

		return {
			message: "Se o email existir, você receberá instruções.",
		};
	}
}

export default EmailVerifiedService;
