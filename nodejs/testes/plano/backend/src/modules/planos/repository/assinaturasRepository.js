class AssinaturasRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async buscaActiveByUser(userId, client = this.pool) {
		const result = await client.query(
			`
            SELECT s.*, p.name as plan_name
            FROM subscriptions s
            JOIN plans p ON p.id = s.plan_id
            WHERE s.user_id = $1
            AND s.status = 'active'
            AND (s.expires_at IS NULL OR s.expires_at > NOW())
            LIMIT 1
            `,
			[userId],
		);

		return result.rows[0];
	}

	async desativarStatus(id, client = this.pool) {
		await client.query(
			`
			UPDATE subscriptions
			SET status = 'inactive'
			WHERE user_id = $1
			AND status = 'active'
			`,
			[id],
		);
	}

	async criandoAssinaturas(id, planoId, expiresAt, client = this.pool) {
		const result = await client.query(
			`
			INSERT INTO subscriptions (
				user_id,
				plan_id,
				status,
				expires_at
			)
			VALUES ($1, $2, $3, $4)
			RETURNING *
			`,
			[id, planoId, "active", expiresAt],
		);

		return result.rows[0];
	}
}

export default AssinaturasRepository;
