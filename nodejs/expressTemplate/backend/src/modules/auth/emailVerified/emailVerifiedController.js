import crypto from 'crypto'
import { AppError } from '../../../errors/appErrors/index.js'
import logger from '../../../logger/pino.js'
import { emailUserSchema } from './emailVerifiedSchema.js';
import path from "node:path";

const __dirname = path.resolve();

class EmailVerifiedController {
    constructor(pool) {
        this.pool= pool

        this.emailVerifield = this.emailVerifield.bind(this)
        this.resendVerification = this.resendVerification.bind(this)

        this.mailService = new MailService(logger)
    }

    async emailVerifield(req, res) {
        const {token} = req.query
        
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        const buscaByToken = await this.pool.query(`
            select * from email_verification_tokens where token_hash = $1
            `, [tokenHash])
            
            const verification = await buscaByToken.rows[0]
            
        if (verification.expires_at < new Date()) {
            throw new AppError(
                "Token expirado",
                400
            );
        }

        await this.pool.query(`
            UPDATE users
            SET email_verified = true
            WHERE id = $1
            AND email_verified = false    
        `,[verification.user_id])

        await this.pool.query(`
            delete from email_verification_tokens where user_id = $1`, 
            [verification.user_id])

        // return res.status(200).json({message: 'Email verificado'})
        return res.sendFile(path.join(__dirname, "public/emailVerificado.html"));
    }

    async resendVerification(req, res) {
        const { email } = emailUserSchema.parse(req.body)

        const buscaUserByEmail = await this.pool.query(`
            SELECT id,email,email_verified
            FROM users
            WHERE email=$1;
            `, [email])
        
            if (buscaUserByEmail.rows.length === 0) {
                throw new AppError(
                    "Se existir uma conta e ela ainda não estiver verificada, um novo e-mail será enviado.",
                    400
                );
            }
        const user = await buscaUserByEmail.rows[0]


        if (user.email_verified) {
            return res.status(200).json({
                message:
                "Se necessário, enviaremos um novo e-mail."
            });
        }

        await this.pool.query(`
            DELETE
            FROM email_verification_tokens
            WHERE user_id=$1;
            `, [user.id])

        const token = crypto.randomBytes(32).toString('hex')
        
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        const expireAt = new Date(Date.now() + 15 * 60 * 1000)

        await this.pool.query(`
            insert into email_verification_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)
        `, [user.id, tokenHash, expireAt])


        await this.mailService.sendResetEmail(email, token)

        res.status(200).json({ message: 'Se existir uma conta e ela ainda não estiver verificada, um novo e-mail será enviado.'})

    }
}
export default EmailVerifiedController

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
