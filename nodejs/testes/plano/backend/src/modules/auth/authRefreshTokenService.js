import jwt from "jsonwebtoken";
import AuthRefreshTokenRepository from "./authRefreshTokenRepository";

class AuthRefreshTokenService {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(this.pool);
	}
	async execute(refreshToken) {
		const token =
			await this.authRefreshTokenRepository.findByToken(refreshToken);

		if (!token) {
			throw new AppError("Refresh token inválido", 401);
		}

		const newAccessToken = jwt.sign(
			{ sub: token.user_id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN },
		);

		return { token: newAccessToken };
	}
}

export default AuthRefreshTokenService;
