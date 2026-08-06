import { Resend } from "resend";
import EmailVerifiedTemplate from "../templates/emailVerified.js";

class MailResendEmailVerifiedService {
	constructor(logger) {
		this.logger = logger;
		this.resend = new Resend(process.env.RESEND_API_KEY);
	}

	async sendEmailVerified(email, rawToken) {
		const verifiedUrl = `${process.env.APP_URL}/user/email-verified?token=${rawToken}`;

		try {
			const { data, error } = await this.resend.emails.send({
				from: process.env.MAIL_FROM,
				to: email,
				subject: "Confirmar e-mail",
				html: EmailVerifiedTemplate(verifiedUrl),
			});

			this.logger.info({
				event: "EMAIL_VERIFICATION",
				email,
				data,
				error,
			});
		} catch (err) {
			this.logger.error({
				event: "MAIL_SEND_ERROR",
				error: err.message,
			});

			throw err;
		}
	}	
}

export default MailResendEmailVerifiedService