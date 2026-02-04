import { AppError } from "../../errors/appErrors/index.js";
import AuthRefreshTokenService from "./authRefreshTokenService.js";

class AuthRefreshTokenController {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenService = new AuthRefreshTokenService(this.pool);
	}

	async refresh(req, res) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const tokenData =
			await this.authRefreshTokenService.refreshService(refreshToken);

		return res.json(tokenData);
	}

	async logout(req, res) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		await this.authRefreshTokenService.logoutService(refreshToken);

		return res.status(204).send();
	}
}

export default AuthRefreshTokenController;
