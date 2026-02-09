class AuditoriaService {
	constructor(pool) {
		this.pool = pool;
	}
	async log({ userId, email, action, ip, userAgent, metadata }) {
		await this.pool.query(
			`
      INSERT INTO auth_audit_logs (
        user_id,
        email,
        action,
        ip,
        user_agent,
		metadata
      ) VALUES ($1, $2, $3, $4, $5, $6)
      `,
			[
				userId || null,
				email || null,
				action,
				ip,
				userAgent,
				metadata ? JSON.stringify(metadata) : null,
			],
		);
	}
}

export default AuditoriaService;
