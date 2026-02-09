import { AppError } from "../../../errors/appErrors/index.js";
import AuditoriaService from "../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";
import { refreshTokenSchema } from "./authRefreshTokenSchema.js";
import AuthRefreshTokenService from "./authRefreshTokenService.js";

class AuthRefreshTokenController {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenService = new AuthRefreshTokenService(this.pool);
		this.auditoriaService = new AuditoriaService(this.pool);
	}

	async refresh(req, res) {
		const { refreshToken } = refreshTokenSchema.parse(req.body);
		// const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const tokenData =
			await this.authRefreshTokenService.refreshService(refreshToken);

		res.cookie("accessToken", tokenData.accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 15 * 60 * 1000,
		});

		return res.json(tokenData);
	}

	async logout(req, res) {
		const { refreshToken } = refreshTokenSchema.parse(req.body);
		// const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		try {
			await this.authRefreshTokenService.logoutService(refreshToken);

			res.clearCookie("accessToken");
			res.clearCookie("refreshToken");
		} finally {
			try {
				await this.auditoriaService.log({
					userId: req.user.id,
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
