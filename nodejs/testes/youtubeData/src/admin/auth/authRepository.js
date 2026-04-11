export default class AuthRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async buscaPorEmail(email) {
        const resultado = await this.pool.query('SELECT name, password, email, criado_em, role, id FROM usuarios WHERE email = $1', [email]);

        return resultado.rows[0] ?? null;
    }
}
