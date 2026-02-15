import crypto from "crypto";
import IsPasswordArgon2 from "../../../configs/argon2.js";
import { AppError } from "../../../errors/appErrors/index.js";
import logger from "../../../logger/pino.js";
import UserRepository from "../users/userRepository.js";
import MailService from "./mailService.js";
import RestaurarSenhaRepository from "./restaurarSenhaRepository.js";

class EsqueciSenhaService {
	constructor(pool) {
		this.pool = pool;

		this.userRepository = new UserRepository(pool);
		this.restaurarSenhaRepository = new RestaurarSenhaRepository(pool);
		this.isPasswordArgon2 = new IsPasswordArgon2();
        this.mailService = new MailService(logger)
	}

	async forgotPasswordService(email) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			logger.warn({
				event: "PASSWORD_RESET_EMAIL_NOT_FOUND",
				email,
			});

			throw new AppError('Error buscar user via email em esqueci senha.', 401);
		}
        
		const rawToken = crypto.randomBytes(32).toString("hex");

		const tokenHash = await this.isPasswordArgon2.hashPassword(rawToken);

		const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

		await this.restaurarSenhaRepository.create({
			userId: user.id,
			tokenHash,
			expiresAt,
		});

		logger.info({
			event: "PASSWORD_RESET_REQUESTED",
			userId: user.id,
		});

		await this.mailService.sendResetEmail(user.email, rawToken);
	}
}

export default EsqueciSenhaService;
