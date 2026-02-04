class AuditoriaService {
	constructor(pool) {
		this.pool = pool;
	}
	async log({ userId, email, action, ip, userAgent }) {
		await this.pool.query(
			`
      INSERT INTO auth_audit_logs (
        user_id,
        email,
        action,
        ip,
        user_agent
      ) VALUES ($1, $2, $3, $4, $5)
      `,
			[userId || null, email || null, action, ip, userAgent],
		);
	}
}

export default AuditoriaService;
