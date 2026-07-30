import { AppError } from "../../../errors/appErrors/index.js";
import RestaurarSenhaService from "./restaurarSenhaService.js";
import { updatePasswordSchema } from "./schemaZod.js";
import {
	authCookiesAccessTokenConfig,
	authCookiesRefreshTokenConfig,
} from "../../../configs/cookies.js";

class RestaurarSenhaController {
	constructor(pool) {
		this.pool = pool;

		this.restaurarSenhaService = new RestaurarSenhaService(this.pool);

		this.resetPassword = this.resetPassword.bind(this);
	}

	async resetPassword(req, res, next) {
		try {
			const { newPassword } = updatePasswordSchema.parse(req.body);

			const token = req.body.token;

			const response = await this.restaurarSenhaService.resetPasswordService(
				token,
				newPassword,
			);

			res.cookie(
				"accessToken",
				response.newAccessToken,
				authCookiesAccessTokenConfig,
			);

			res.cookie(
				"refreshToken",
				response.newRefreshToken,
				authCookiesRefreshTokenConfig,
			);

			return res.status(204).send();
		} catch (error) {
			next(error);
		}
	}
}

export default RestaurarSenhaController;
