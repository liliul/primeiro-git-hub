import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../../errors/appErrors/index.js";
import { resolvePermissionsJwt } from "../../utils/resolvePermissions.js";
import UserRepository from "../users/userRepository.js";
import AuthRefreshTokenRepository from "./authRefreshTokenRepository.js";

class AuthRefreshTokenService {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(this.pool);
		this.userRepository = new UserRepository(this.pool);
	}
	async refreshService(refreshToken) {
		const token =
			await this.authRefreshTokenRepository.findByToken(refreshToken);

		if (!token) {
			throw new AppError("Refresh token não existe no banco", 401);
		}

		await this.authRefreshTokenRepository.deleteById(token.id);

		const newRefreshToken = crypto.randomUUID();

		await this.authRefreshTokenRepository.create({
			userId: token.user_id,
			token: newRefreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		const userId = await this.userRepository.findByUserId(token.user_id);

		if (!userId) {
			throw new AppError("Busca pelo o user_id falhou ou não existe", 401);
		}

		const permissions = resolvePermissionsJwt(userId.roles);

		const newAccessToken = jwt.sign(
			{ roles: userId.roles, permissions },
			process.env.JWT_SECRET,
			{
				subject: userId.id,
				expiresIn: process.env.JWT_EXPIRES_IN,
			},
		);

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	async logoutService(refreshToken) {
		const verificarTokenExiste =
			await this.authRefreshTokenRepository.findByToken(refreshToken);

		if (!verificarTokenExiste) {
			throw new AppError("Refresh token não existe no banco", 401);
		}

		await this.authRefreshTokenRepository.deleteByToken(refreshToken);
	}
}

export default AuthRefreshTokenService;
