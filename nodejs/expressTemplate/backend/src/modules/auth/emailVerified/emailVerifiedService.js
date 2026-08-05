import crypto from 'crypto'
import logger from '../../../logger/pino.js'
import MailResendEmailVerifiedService from '../../mail/services/MailResendEmailVerfifiedService.js'

class EmailVerifiedService {
	constructor(pool) {
		this.pool = pool

		this.mailResendEmailVerifiedService = new MailResendEmailVerifiedService(logger)
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

		await this.mailResendEmailVerifiedService.sendEmailVerified(email, token)

		return {
			message: 'Se o email existir, você receberá instruções.'
		}
	}
}

export default EmailVerifiedService;
