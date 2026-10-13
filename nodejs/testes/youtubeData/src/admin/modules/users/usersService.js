import { AppError } from "../../../errors/AppError.js"
import z from "zod"

const userIdScheme = z.uuid()

class UsersService {
    constructor(usersRepositoryInject) {
        this.usersRepositoryInject = usersRepositoryInject
    }

    async searchUsersAll() {
        const user = await this.usersRepositoryInject.searchUsersAll()

        return user
    }

    async searchUserById(id) {
        const userIdValidation = userIdScheme.safeParse(id)

        if (!userIdValidation.success) {
            throw new AppError('Id é obrigatorio.', 400)
        }

        const user = await this.usersRepositoryInject.searchUserById(id)
        
        if (!user) {
            throw new AppError('Usuario não existe.', 404)
        }

        return user
    }
}

export default UsersService;