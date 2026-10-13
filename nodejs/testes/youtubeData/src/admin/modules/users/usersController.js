class UserController {
    constructor(serviceInject) {
        this.serviceInject = serviceInject

        this.searchUsersAll = this.searchUsersAll.bind(this);
        this.searchUserById = this.searchUserById.bind(this);
    }

    async searchUsersAll(req, res, next) {
        try {
            const users = await this.serviceInject.searchUsersAll()
            
            return res.status(200).json({ users, message: 'Success' })
        } catch (error) {
            next(error)
        }
    }

    async searchUserById(req, res, next) {
        try {
            const { id } = req.params

            const user = await this.serviceInject.searchUserById(id)

            return res.status(200).json({ user, message: 'Success' })
        } catch (error) {
            next(error)
        }
    }
}

export default UserController;