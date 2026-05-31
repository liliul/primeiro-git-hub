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

	async buscaPlanosById(id) {
		const result = await this.pool.query(
			`
			SELECT * FROM plans
			WHERE id = $1
			LIMIT 1
			`,
			[id],
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

	async atualizarPlanoById(id, dados) {
		const campos = [];
		const valores = [];
		let index = 1;

		for (const [chave, valor] of Object.entries(dados)) {
			campos.push(`${chave} = $${index}`);
			valores.push(valor);
			index++;
		}

		valores.push(id);

		const query = `
		UPDATE plans
		SET ${campos.join(", ")}
		WHERE id = $${index}
		RETURNING *;
		`;

		const result = await this.pool.query(query, valores);

		return result.rows[0];
	}

	async deletarPlanoById(id) {
		const result = await this.pool.query(
			`
			DELETE FROM plans WHERE id = $1 RETURNING *
			`,
			[id],
		);

		return result.rows[0];
	}
}

export default PlanosRepository;
