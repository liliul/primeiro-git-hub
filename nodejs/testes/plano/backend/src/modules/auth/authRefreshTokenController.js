import { AppError } from "../../errors/appErrors/index.js";
import AuditoriaService from "../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../auditoria/domain/auditoriaActive.js";
import AuthRefreshTokenService from "./authRefreshTokenService.js";
import { refreshTokenSchema } from "./authSchema.js";

class AuthRefreshTokenController {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenService = new AuthRefreshTokenService(this.pool);
		this.auditoriaService = new AuditoriaService(this.pool);
	}

	async refresh(req, res) {
		const { refreshToken } = refreshTokenSchema.parse(req.body);

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const tokenData =
			await this.authRefreshTokenService.refreshService(refreshToken);

		return res.json(tokenData);
	}

	async logout(req, res) {
		const { refreshToken } = refreshTokenSchema.parse(req.body);

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const userId = req.user?.id;

		try {
			await this.authRefreshTokenService.logoutService(refreshToken);
			
		} finally {
			try {
				await this.auditoriaService.log({
					userId,
					action: AuditoriaAction.LOGOUT,
					ip: req.ip,
					userAgent: req.headers["user-agent"],
				});
			} catch (err) {
				console.error("Falha ao auditar LOGOUT", err);
			}
		}

		return res.status(204).send();
	}
}

export default AuthRefreshTokenController;
