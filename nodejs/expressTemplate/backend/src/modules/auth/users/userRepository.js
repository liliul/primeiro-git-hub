class UserRepository {
	constructor(pool) {
		this.pool = pool;
	}

	async createUserRepository({ name, email, password }) {
		const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
  `;

		const values = [name, email, password];

		const { rows } = await this.pool.query(query, values);
		return rows[0];
	}

	async loginUserRepository(email) {
		const query = `
      SELECT id, name, email, password, roles
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

		const { rows } = await this.pool.query(query, [email]);
		return rows[0];
	}

	async meUserRepository(id) {
		const query = `
      SELECT id, name, email, roles
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

		const { rows } = await this.pool.query(query, [id]);
		return rows[0];
	}

	async findByUserId(id) {
		const query = `
      SELECT id, roles
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

		const { rows } = await this.pool.query(query, [id]);
		return rows[0];
	}

	async updateNameRepository(userId, name) {
		const query = `
      UPDATE users
      SET
        name = COALESCE($2, name)
      WHERE id = $1
      `;

		const value = [userId, name ?? null];
		const { rows } = await this.pool.query(query, value);

		return rows[0];
	}

	async findByUpdatePassword(userId) {
		const query = `
		 SELECT id, password FROM users WHERE id = $1 LIMIT 1
		`;
		const { rows } = await this.pool.query(query, [userId]);

		return rows[0];
	}

	async updatePasswordRepository(userId, hashedPassword) {
		const query = `
      UPDATE users
      SET
        password = $2
      WHERE id = $1
	  RETURNING id
      `;

		const value = [userId, hashedPassword ?? null];
		const { rows } = await this.pool.query(query, value);

		return rows[0];
	}

	async findByEmail(email) {
		const query = `
      SELECT id, name, email
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

		const { rows } = await this.pool.query(query, [email]);
		return rows[0];
	}
}

export default UserRepository;
