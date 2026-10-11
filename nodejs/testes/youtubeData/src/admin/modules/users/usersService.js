import { AppError } from "../../../errors/AppError.js"

class UsersService {
    constructor(usersRepositoryInject) {
        this.usersRepositoryInject = usersRepositoryInject
    }

    async searchUsersAll() {
        const user = await this.usersRepositoryInject.searchUsersAll()

        if (!user) {
            throw new AppError('Usuario não existe.', 401)
        }

        return user
    }
}

export default UsersService;