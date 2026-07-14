export default class AuthRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async buscaPorEmail(email) {
        const resultado = await this.pool.query('SELECT name, password, email, criado_em, role, id FROM usuarios WHERE email = $1', [email]);

        return resultado.rows[0] ?? null;
    }

    async atualizandoRefreshToken({refreshToken, expiresAt, id}) {
        await this.pool.query(
            `
            INSERT INTO usuarios_refresh_token (
                user_id,
                refresh_token,
                expires_at
            )
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id)
            DO UPDATE SET
                refresh_token = EXCLUDED.refresh_token,
                expires_at = EXCLUDED.expires_at;
            `,
            [id, refreshToken, expiresAt]
        );
    }

    async buscaUsuarioById(id) {
        const resultado = await this.pool.query(
            `SELECT id, name, email, criado_em, role FROM usuarios WHERE id = $1`,
            [id]
        )

        return resultado.rows[0] ?? null;
    }

    async buscarRefreshTokenByToken(token) {
        const resultado = await this.pool.query(
            `SELECT * FROM usuarios_refresh_token WHERE refresh_token = $1`,
            [token]
        )

        return resultado.rows[0] ?? null;
    }

    async deletarRefreshTokenById(id) {
		await this.pool.query(`DELETE FROM usuarios_refresh_token WHERE id = $1`, [id]);
	}
}
