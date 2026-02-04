class HealthRepository {
	constructor(pool) {
		this.pool = pool;
	}
	async checkDatabase() {
		const result = await this.pool.query("SELECT 1");
		return result.rowCount === 1 ? "online" : "offline";
	}
}

export default HealthRepository;
