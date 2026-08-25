import crypto from "crypto";
import logger from "../../../logger/pino.js";
import MailResendEmailVerifiedService from "../../mail/services/MailResendEmailVerfifiedService.js";
import { emailUserSchema, userIdSchema } from "./emailVerifiedSchema.js";
import EmailVerificadoRepository from "./emailVerificadoRepository.js";

class EmailVerificadoAdapter {
	constructor(pool) {
		this.pool = pool;

		this.mailResendEmailVerifiedService = new MailResendEmailVerifiedService(
			logger,
		);

		this.emailVerificadoRepository = new EmailVerificadoRepository(this.pool);
	}

	async verificandoEmailUser(userId, email) {
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

export default EmailVerificadoAdapter;
