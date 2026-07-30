import { AppError } from "../../../errors/appErrors/index.js";
import AuditoriaService from "../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";
import AuthRefreshTokenRepository from "./authRefreshTokenRepository.js";
import { refreshTokenSchema } from "./authRefreshTokenSchema.js";
import AuthRefreshTokenService from "./authRefreshTokenService.js";
import {
	authCookiesAccessTokenConfig,
	authCookiesRefreshTokenConfig,
	clearCookieConfig,
} from "../../../configs/cookies.js";

class AuthRefreshTokenController {
	constructor(pool) {
		this.pool = pool;
		this.authRefreshTokenService = new AuthRefreshTokenService(this.pool);
		this.auditoriaService = new AuditoriaService(this.pool);
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(this.pool);

		this.refresh = this.refresh.bind(this);
		this.logout = this.logout.bind(this);
	}

	async refresh(req, res) {
		// const { refreshToken } = refreshTokenSchema.parse(req.cookies.refreshToken);
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const tokenData =
			await this.authRefreshTokenService.refreshService(refreshToken);

		res.cookie(
			"accessToken",
			tokenData.accessToken,
			authCookiesAccessTokenConfig,
		);

		res.cookie(
			"refreshToken",
			tokenData.refreshToken,
			authCookiesRefreshTokenConfig,
		);

		return res.status(200).send();
	}

	async logout(req, res) {
		// const { refreshToken } = refreshTokenSchema.parse(req.body);
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			throw new AppError("Refresh token obrigatório", 400);
		}

		const verificarTokenExiste =
			await this.authRefreshTokenRepository.findByToken(refreshToken);

		if (!verificarTokenExiste) {
			throw new AppError("Refresh token não existe no banco", 401);
		}

		try {
			await this.authRefreshTokenService.logoutService(refreshToken);

			res.clearCookie("accessToken", clearCookieConfig);

			res.clearCookie("refreshToken", clearCookieConfig);
		} finally {
			try {
				await this.auditoriaService.log({
					userId: verificarTokenExiste.user_id,
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
