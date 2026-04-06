class AuthRefreshTokenRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async create({ userId, token, expiresAt }) {
		await this.pool.query(
			`
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `,
			[userId, token, expiresAt],
		);
	}

	async findByToken(token) {
		const { rows } = await this.pool.query(
			`
      SELECT * FROM refresh_tokens
      WHERE token = $1 AND expires_at > NOW()
      LIMIT 1
    `,
			[token],
		);

		return rows[0];
	}

	async deleteById(id) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE id = $1`, [id]);
	}

	async deleteByToken(token) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [
			token,
		]);
	}

	async deleteByUserId(userId) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [
			userId,
		]);
	}
}

export default AuthRefreshTokenRepository;
