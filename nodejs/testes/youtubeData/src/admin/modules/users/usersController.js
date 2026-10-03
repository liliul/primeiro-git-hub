class UserController {
    constructor(pool) {
        this.pool = pool;

        this.searchUserAll = this.searchUserAll.bind(this);
        this.searchUserById = this.searchUserById.bind(this);
    }

    async searchUserAll(req, res) {
        const user = await this.pool.query(`select * from google_users;`)
        if (!user.rows[0]) {
            return res.status(401).json({error: 'Usuario não existe.'})
        }
        console.log(user.rows);
        
        return res.status(200).json({ userAll: user.rows, message: 'Success' })
    }

    async searchUserById(req, res) {
        const {id} = req.params

        if (!id) {
            return res.status(401).json({ erro: 'Id é obrigatorio.' })
        }

        const user = await this.pool.query(`select * from google_users where id = $1;`, [id])
        if (!user.rows[0]) {
            return res.status(401).json({ error: 'Usuario não existe.' })
        }

        console.log(user.rows);

        return res.status(200).json({ userId: user.rows, message: 'Success' })
    }
}

export default UserController;