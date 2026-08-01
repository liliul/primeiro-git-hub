import crypto from 'crypto'
import logger from '../../../logger/pino.js'

class EmailVerifiedService {
	constructor(pool) {
		this.pool = pool

		this.mailService = new MailService(logger)
	}

	async verificationEmail(userId, email) {
		const token = crypto.randomBytes(32).toString('hex')

		const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

		const expireAt = new Date(Date.now() + 15 * 60 * 1000)

		await this.pool.query(`
			insert into email_verification_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)
		`, [userId, tokenHash, expireAt])

		await this.pool.query(`
            UPDATE users
            SET email_verified = false
            WHERE id = $1    
        `,[userId])

		await this.mailService.sendResetEmail(email, token)

		return {
			message: 'Se o email existir, você receberá instruções.'
		}
	}
}

export default EmailVerifiedService;

import { Resend } from "resend";

class MailService {
	constructor(logger) {
		this.logger = logger;
		this.resend = new Resend(process.env.RESEND_API_KEY);
	}

	async sendResetEmail(email, rawToken) {
		const resetUrl = `${process.env.APP_URL}/user/email-verified?token=${rawToken}`;

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
				subject: "Confirmar e-mail",
				html: this.resetTemplate(resetUrl),
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
