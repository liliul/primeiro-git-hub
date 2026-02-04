import AuthRefreshTokenService from "./authRefreshTokenService";

class AuthRefreshTokenController {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenController = new AuthRefreshTokenService(this.pool);
	}

	async refresh(req, res) {
		const { refreshToken } = req.body;

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const tokenData =
			await this.authRefreshTokenController.execute(refreshToken);

		return res.json(tokenData);
	}
}

export default AuthRefreshTokenController;
