class UserController {
    constructor(pool, serviceInject) {
        this.pool = pool;
        this.serviceInject = serviceInject

        this.searchUsersAll = this.searchUsersAll.bind(this);
        this.searchUserById = this.searchUserById.bind(this);
    }

    async searchUsersAll(req, res, next) {
        try {
            const users = await this.serviceInject.searchUsersAll()
            
            return res.status(200).json({ userAll: users, message: 'Success' })
        } catch (error) {
            console.error('Error searchUserAll: ', error)
            next(error)
        }
    }

    async searchUserById(req, res, next) {
        try {
            const {id} = req.params

            if (!id) {
                return res.status(401).json({ erro: 'Id é obrigatorio.' })
            }

            const user = await this.pool.query(` 
                select 
                id, sub, email, email_verified, name, given_name, family_name, picture, created_at 
                from 
                google_users
                where id = $1;`, [id]
            )
            
            if (!user.rows[0]) {
                return res.status(401).json({ error: 'Usuario não existe.' })
            }

            console.log(user.rows);

            return res.status(200).json({ userId: user.rows, message: 'Success' })
        } catch (error) {
            console.error('Error searchUserById: ', error)
            next(error)
        }
    }
}

export default UserController;