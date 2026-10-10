import { AppError } from "../../../errors/AppError.js"

class UsersService {
    constructor(usersRepositoryInject) {
        this.usersRepositoryInject = usersRepositoryInject
    }

    async searchUserAll() {
        const user = await this.usersRepositoryInject.searchUserAll()

        if (!user) {
            throw new AppError('Usuario não existe.', 401)
        }

        return user
    }
}

export default UsersService;