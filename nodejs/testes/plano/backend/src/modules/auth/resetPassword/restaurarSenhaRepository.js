class RestaurarSenhaRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async create({ userId, tokenHash, expiresAt }) {
		const query = `
      INSERT INTO password_resets (user_id, token_hash, expires_at)
      VALUES ($1, $2, NOW() + INTERVAL '15 minutes')
      RETURNING id
    `;

		const { rows } = await this.pool.query(query, [userId, tokenHash]);

		return rows[0];
	}

	async findValidByUser(userId) {
		const query = `
    SELECT *
    FROM password_resets
    WHERE user_id = $1
      AND used = false
      AND expires_at > NOW()
    ORDER BY created_at DESC
  `;

		const { rows } = await this.pool.query(query, [userId]);

		return rows;
	}

	async invalidateAll(userId) {
		const query = `
    UPDATE password_resets
    SET used = true
    WHERE user_id = $1
      AND used = false
  `;

		await this.pool.query(query, [userId]);
	}

	async findValidByTokenHash(tokenHash) {
		const query = `
    SELECT *
	FROM password_resets
	WHERE token_hash = $1
	AND used = false
	AND expires_at > NOW()
	LIMIT 1
  `;

		const { rows } = await this.pool.query(query, [tokenHash]);

		console.log("RAW RESULT:", rows);

		return rows[0];
	}

	async findValidByToken(tokenHash) {
		const query = `
    SELECT *
    FROM password_resets
    WHERE token_hash = $1
      AND used = false
      AND expires_at > NOW()
    LIMIT 1
  `;

		const { rows } = await this.pool.query(query, [tokenHash]);

		return rows[0];
	}
}

export default RestaurarSenhaRepository;
