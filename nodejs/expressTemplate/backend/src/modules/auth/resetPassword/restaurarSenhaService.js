import crypto from "crypto";
import IsPasswordArgon2 from "../../../configs/argon2.js";
import { AppError } from "../../../errors/appErrors/index.js";
import logger from "../../../logger/pino.js";
import UserRepository from "../users/userRepository.js";
import RestaurarSenhaRepository from "./restaurarSenhaRepository.js";
import AuthRefreshTokenRepository from "../refreshToken/authRefreshTokenRepository.js";
import { resolvePermissionsJwt } from "../../../utils/resolvePermissions.js";
import jwt from "jsonwebtoken";

class RestaurarSenhaService {
	constructor(pool) {
		this.pool = pool;

		this.restaurarSenhaRepository = new RestaurarSenhaRepository(this.pool);
		this.userRepository = new UserRepository(this.pool);
		this.isPasswordArgon2 = new IsPasswordArgon2();
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(this.pool);
	}

	async resetPasswordService(token, newPassword) {
		if (!token) {
			throw new AppError("Token não informado", 401);
		}

		const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

		const restaurarRegistro =
			await this.restaurarSenhaRepository.findValidByTokenHash(tokenHash);

		if (!restaurarRegistro) {
			logger.warn({
				event: "PASSWORD_RESET_INVALID_TOKEN",
			});

			throw new AppError("Token inválido ou expirado", 400);
		}

		const hashedPassword =
			await this.isPasswordArgon2.hashPassword(newPassword);

		await this.userRepository.updatePasswordRepository(
			restaurarRegistro.user_id,
			hashedPassword,
		);

		await this.restaurarSenhaRepository.invalidateAll(
			restaurarRegistro.user_id,
		);

		await this.authRefreshTokenRepository.deleteByUserId(
			restaurarRegistro.user_id,
		);
		const userId = await this.userRepository.findByUserId(
			restaurarRegistro.user_id,
		);

		const newRefreshToken = crypto.randomUUID();
		const permissions = resolvePermissionsJwt(userId.roles);

		const newAccessToken = jwt.sign(
			{ roles: userId.roles, permissions },
			process.env.JWT_SECRET,
			{
				subject: userId.id,
				expiresIn: process.env.JWT_EXPIRES_IN,
				algorithm: 'HS256'
			},
		);

		await this.authRefreshTokenRepository.create({
			userId: restaurarRegistro.user_id,
			token: newRefreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		logger.info({
			event: "PASSWORD_RESET_SUCCESS",
			userId: restaurarRegistro.user_id,
		});

		return {
			newAccessToken,
			newRefreshToken,
		};
	}
}

export default RestaurarSenhaService;
