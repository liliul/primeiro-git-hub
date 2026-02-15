import AuditoriaService from "../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";
import {
	createUserSchema,
	loginSchema,
	updatePasswordSchema,
	updateUserSchema,
} from "./userSchema.js";
import UserService from "./userService.js";

class UserController {
	constructor(pool) {
		this.pool = pool;

		this.userService = new UserService(this.pool);
		this.auditoriaService = new AuditoriaService(this.pool);
	}

	async create(req, res) {
		const { name, email, password } = createUserSchema.parse(req.body);

		const user = await this.userService.createUserService(
			name,
			email,
			password,
		);

		req.logger.info({ event: "AUTH_CREATED_SUCCESS", userId: user.id });

		return res.status(201).json(user);
	}

	async login(req, res) {
		const { email, password } = loginSchema.parse(req.body);

		console.log(email, password);
		try {
			const response = await this.userService.loginUserService(email, password);
			
			try {
				await this.auditoriaService.log({
					userId: response.user.id,
					email: response.user.email,
					action: AuditoriaAction.LOGIN_SUCCESS,
					ip: req.ip,
					userAgent: req.headers["user-agent"],
				});
			} catch (err) {
				console.error("Falha ao auditar LOGIN_SUCCESS", err);
			}

			res.cookie("accessToken", response.accessToken, {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 15 * 60 * 1000,
			});

			res.cookie("refreshToken", response.refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			req.logger.info({
				event: "AUTH_LOGIN_SUCCESS",
				userId: response?.user?.id,
			});

			return res.status(200).json(response);
		} catch (error) {
			try {
				await this.auditoriaService.log({
					email,
					action: AuditoriaAction.LOGIN_FAIL,
					ip: req.ip,
					userAgent: req.headers["user-agent"],
				});
			} catch (err) {
				console.error("Falha ao auditar LOGIN_FAIL", err);
			}

			req.logger.warn({
				event: "AUTH_LOGIN_FAIL",
				email,
				ip: req.ip,
			});

			throw error;
		}
	}

	async me(req, res) {
		const userId = req.user.id;
		const permissions = req.user.permissions;

		if (!userId) {
			return res.status(401).json({ message: "User id da rota me invalido" });
		}

		const response = await this.userService.meUserService(userId);

		const data = {
			response,
			permissions,
		};

		req.logger.info({
			event: "USER_ME_FETCHED",
			userId,
		});

		return res.status(200).json(data);
	}

	async updateName(req, res) {
		const userId = req.user.id;

		if (!userId) {
			req.logger.warn({ event: "AUTH_REQUIRED" });

			return res.status(401).json({ message: "Usuário não autenticado" });
		}

		const { name } = updateUserSchema.parse(req.body);

		await this.userService.updateNameService(userId, name);

		req.logger.info({ event: "USER_NAME_UPDATED", userId });

		return res.status(204).send();
	}

	async updatePassword(req, res) {
		const userId = req.user.id;

		if (!userId) {
			req.logger.warn({ event: "AUTH_REQUIRED" });

			return res.status(401).json({ message: "Usuário não autenticado" });
		}

		const { password, newpassword } = updatePasswordSchema.parse(req.body);

		await this.userService.updatePasswordService(userId, password, newpassword);

		req.logger.info({ event: "USER_NEWPASSWORD_UPDATED", userId });

		return res.status(204).send();
	}
}

export default UserController;
