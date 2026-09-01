class EmailVerificadoRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async createEmailVerifiedTokens(user_id, tokenHash, expireAt) {
		await this.pool.query(
			`
			insert into email_verification_tokens (user_id, token_hash, expires_at) values ($1, $2, $3)
		`,
			[user_id, tokenHash, expireAt],
		);
	}

	async updateEmailVerifiedFalse(user_id) {
		await this.pool.query(
			`
            UPDATE users
            SET email_verified = false
            WHERE id = $1    
        `,
			[user_id],
		);
	}

	async searchUserByEmail(email) {
		const { rows } = await this.pool.query(
			`
					SELECT id,email,email_verified
					FROM users
					WHERE email=$1;
					`,
			[email],
		);

		return rows[0];
	}

	async deleteEmailVerificationtokensById(userId) {
		await this.pool.query(
			`
					DELETE
					FROM email_verification_tokens
					WHERE user_id=$1;
					`,
			[userId],
		);
	}

	async updateUserEmailVerificadoTransitionById(clients, userId) {
		await clients.query(
			`
                UPDATE users
                SET email_verified = true
                WHERE id = $1
                AND email_verified = false    
            `,
			[userId],
		);
	}

	async deleteEmailVerificationtokensTransitionById(clients, userId) {
		await clients.query(
			`
                delete from email_verification_tokens where user_id = $1`,
			[userId],
		);
	}

	async searchEmailVerificationTokensByTokenHash(tokenHash) {
		const { rows } = await this.pool.query(
			`
            select * from email_verification_tokens where token_hash = $1
            `,
			[tokenHash],
		);

		return rows[0];
	}
}

export default EmailVerificadoRepository;
