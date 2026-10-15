class UsersRepository {
    constructor(DBInject) {
        this.DBInject = DBInject
    }

    async searchUsersAll() {
        const result = await this.DBInject.query(`
            SELECT 
            id, sub, email, email_verified, name, given_name, family_name, picture, created_at 
            From 
            google_users 
            ORDER BY created_at DESC;
        `)

        return result.rows
    }

    async searchUserById(id) {
        const result = await this.DBInject.query(` 
            SELECT 
            id, sub, email, email_verified, name, given_name, family_name, picture, created_at 
            FROM 
            google_users
            WHERE id = $1;`, [id]
        )

        return result.rows[0] ?? null
    }
}

export default UsersRepository;