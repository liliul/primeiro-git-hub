import { Resend } from "resend";

class MailResendEmailVerifiedService {
	constructor(logger) {
		this.logger = logger;
		this.resend = new Resend(process.env.RESEND_API_KEY);
	}

	async sendEmailVerified(email, rawToken) {
		const resetUrl = `${process.env.APP_URL}/user/email-verified?token=${rawToken}`;

		try {
			const { data, error } = await this.resend.emails.send({
				from: process.env.MAIL_FROM,
				to: email,
				subject: "Confirmar e-mail",
				html: this.resetTemplate(resetUrl),
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

	resetTemplate(resetUrl) {
		return `
      <div style="font-family: Arial; max-width: 600px;">
        <h2>Confirmar seu E-mail.</h2>
        <p>Verificando email.</p>
        <p>Clique no botão abaixo:</p>
        <a href="${resetUrl}" 
           style="background: #000; color: #fff; padding: 10px 15px; text-decoration: none;">
           verificar
        </a>
        <p>Esse link expira em 15 minutos.</p>
      </div>
    `;
	}
}

export default MailResendEmailVerifiedService