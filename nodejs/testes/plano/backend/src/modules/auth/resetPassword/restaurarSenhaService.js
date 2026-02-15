import IsPasswordArgon2 from "../../../configs/argon2.js";
import { AppError } from "../../../errors/appErrors/index.js";
import logger from "../../../logger/pino.js";
import UserRepository from "../users/userRepository.js";
import RestaurarSenhaRepository from "./restaurarSenhaRepository.js";

class RestaurarSenhaService {
	constructor(pool) {
		this.pool = pool;

		this.restaurarSenhaRepository = new RestaurarSenhaRepository(this.pool);
        this.userRepository = new UserRepository(this.pool)
        this.isPasswordArgon2 = new IsPasswordArgon2()
	}

	async resetPasswordService(token, newPassword) {
		const restaurarRegistro =
			await this.restaurarSenhaRepository.findValidByUser(token);

		if (!restaurarRegistro) {
			logger.warn({
				event: "PASSWORD_RESET_INVALID_TOKEN",
			});

			throw new AppError("Token inválido ou expirado", 400);
		}

        const hashedPassword = await this.isPasswordArgon2.hashPassword(newPassword)
        
		await this.userRepository.updatePasswordRepository(restaurarRegistro.userId, hashedPassword);

		await this.restaurarSenhaRepository.invalidateAll(restaurarRegistro.id);

		logger.info({
			event: "PASSWORD_RESET_SUCCESS",
			userId: restaurarRegistro.userId,
		});
	}
}

export default RestaurarSenhaService;
