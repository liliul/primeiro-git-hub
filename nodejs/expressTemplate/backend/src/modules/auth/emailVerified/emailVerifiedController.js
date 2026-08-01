import crypto from 'crypto'
import { AppError } from '../../../errors/appErrors/index.js'

class EmailVerifiedController {
    constructor(pool) {
        this.pool= pool

        this.emailVerifield = this.emailVerifield.bind(this)
    }

    async emailVerifield(req, res) {
        const {token} = req.body
        // const id = '98ae4755-2205-4acc-8de9-27a10212b312'
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

        const buscaByToken = await this.pool.query(`
            select * from email_verification_tokens where token_hash = $1
        `, [tokenHash])
        
        const verification = await buscaByToken.rows[0]
            console.log(verification);
            
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

        return res.status(200).json({message: 'Email verificado'})
    }
}
export default EmailVerifiedController