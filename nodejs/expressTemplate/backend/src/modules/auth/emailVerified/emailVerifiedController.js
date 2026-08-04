import crypto from 'crypto'
import { AppError } from '../../../errors/appErrors/index.js'
import logger from '../../../logger/pino.js'
import { emailUserSchema } from './emailVerifiedSchema.js';
import MailResendEmailVerifiedService from '../../mail/services/MailResendEmailVerfifiedService.js';
import path from "node:path";

const __dirname = path.resolve();

class EmailVerifiedController {
    constructor(pool) {
        this.pool= pool

        this.emailVerifield = this.emailVerifield.bind(this)
        this.resendVerification = this.resendVerification.bind(this)

        this.mailResendEmailVerifiedService = new MailResendEmailVerifiedService(logger)
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


        await this.mailResendEmailVerifiedService.sendEmailVerified(email, token)

        res.status(200).json({ message: 'Se existir uma conta e ela ainda não estiver verificada, um novo e-mail será enviado.'})

    }
}
export default EmailVerifiedController
