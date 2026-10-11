class UsersRepository {
    constructor(DBInject) {
        this.DBInject = DBInject
    }

    async searchUsersAll() {
        const result = await this.DBInject.query(`
            select 
            id, sub, email, email_verified, name, given_name, family_name, picture, created_at 
            from 
            google_users;
        `)

        return result.rows[0] ?? null
    }

    async searchUserById(id) {
        const result = await this.DBInject.query(` 
            select 
            id, sub, email, email_verified, name, given_name, family_name, picture, created_at 
            from 
            google_users
            where id = $1;`, [id]
        )

        return result.rows[0] ?? null
    }
}

export default UsersRepository;