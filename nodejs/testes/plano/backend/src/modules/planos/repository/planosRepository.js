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

	async criandoNovoPlano({ name, price, duration_days }) {
		const result = await this.pool.query(
			`
			INSERT INTO plans (name, price, duration_days) VALUES ($1, $2, $3) RETURNING *
		`,
			[name, price, duration_days],
		);

		return result.rows[0];
	}

	async buscandoTodosPlanos() {
		const result = await this.pool.query(
			`
				SELECT id, name, price, duration_days FROM plans;
			`,
		);

		return result.rows;
	}
}

export default PlanosRepository;
