class PlanosRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async buscaPlanosByName(planName) {
		const result = await this.pool.query(
			`
			SELECT * FROM plans
			WHERE name = $1
			LIMIT 1
			`,
			[planName],
		);

		return result.rows[0];
	}
}

export default PlanosRepository;
