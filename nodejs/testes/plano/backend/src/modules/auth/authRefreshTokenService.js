import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../../errors/appErrors/index.js";
import AuthRefreshTokenRepository from "./authRefreshTokenRepository.js";

class AuthRefreshTokenService {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(this.pool);
	}
	async refreshService(refreshToken) {
		const token =
			await this.authRefreshTokenRepository.findByToken(refreshToken);

		if (!token) {
			throw new AppError("Refresh token inválido", 401);
		}

		await this.authRefreshTokenRepository.deleteById(token.id);

		const newRefreshToken = crypto.randomUUID();

		await this.authRefreshTokenRepository.create({
			userId: token.user_id,
			token: newRefreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		const newAccessToken = jwt.sign({}, process.env.JWT_SECRET, {
			subject: token.user_id,
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

		return {
			token: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	async logoutService(refreshToken) {
		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		await this.authRefreshTokenRepository.deleteByToken(refreshToken);
	}
}

export default AuthRefreshTokenService;
