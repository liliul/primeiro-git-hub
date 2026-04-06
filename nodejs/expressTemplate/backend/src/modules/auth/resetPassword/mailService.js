import { Resend } from "resend";
import RedefinirSenhaTemplate from "../../mail/templates/redefinirSenha.js";

class MailService {
	constructor(logger) {
		this.logger = logger;
		this.resend = new Resend(process.env.RESEND_API_KEY);
	}

	async sendResetEmail(email, rawToken) {
		const resetUrl = `${process.env.APP_URL}/auth/restaurar-senha?token=${rawToken}`;

		// if (process.env.NODE_ENV === "development") {
		//   this.logger.info({
		//     event: "DEV_PASSWORD_RESET_LINK",
		//     email,
		//     resetUrl,
		//   });

		//   throw new AppError('DEV: desenvolvimento', 401);
		// }
		console.log(process.env.MAIL_FROM);

		try {
			const { data, error } = await this.resend.emails.send({
				from: process.env.MAIL_FROM,
				to: email,
				subject: "Redefinição de senha",
				html: RedefinirSenhaTemplate(resetUrl),
			});

			this.logger.info({
				event: "PASSWORD_RESET_EMAIL_SENT",
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
        <h2>Redefinição de senha</h2>
        <p>Você solicitou redefinição de senha.</p>
        <p>Clique no botão abaixo:</p>
        <a href="${resetUrl}" 
           style="background: #000; color: #fff; padding: 10px 15px; text-decoration: none;">
           Redefinir senha
        </a>
        <p>Esse link expira em 15 minutos.</p>
      </div>
    `;
	}
}

export default MailService;
