class AssinaturaRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async buscaActiveByUser(userId) {
		const result = await this.pool.query(
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
}

export default AssinaturaRepository;
