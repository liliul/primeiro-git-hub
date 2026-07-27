import HashTokenService from "../../../utils/hashTokenService.js";

class AuthRefreshTokenRepository {
	constructor(pool) {
		this.pool = pool;

		this.hashTokenService = new HashTokenService();
	}

	async create({ userId, token, expiresAt }) {
		const hashToken = this.hashTokenService.hashRefreshToken(token);

		await this.pool.query(
			`
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `,
			[userId, hashToken, expiresAt],
		);
	}

	async findByToken(token) {
		const hashToken = this.hashTokenService.hashRefreshToken(token);

		const { rows } = await this.pool.query(
			`
      SELECT * FROM refresh_tokens
      WHERE token = $1 AND expires_at > NOW()
      LIMIT 1
    `,
			[hashToken],
		);

		return rows[0];
	}

	async deleteById(id) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE id = $1`, [id]);
	}

	async deleteByToken(token) {
		const hashToken = this.hashTokenService.hashRefreshToken(token);

		await this.pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [
			hashToken,
		]);
	}

	async deleteByUserId(userId) {
		await this.pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [
			userId,
		]);
	}
}

export default AuthRefreshTokenRepository;
