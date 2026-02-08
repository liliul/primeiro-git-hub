import AuditoriaService from "../../auditoria/auditoriaService.js";
import { AuditoriaAction } from "../../auditoria/domain/auditoriaActive.js";
import {
	createUserSchema,
	loginSchema,
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

		if (!name || !email || !password) {
			return res.status(400).json({ message: "Dados obrigatórios ausentes" });
		}

		const user = await this.userService.createUserService(
			name,
			email,
			password,
		);

		return res.status(201).json(user);
	}

	async login(req, res) {
		const { email, password } = loginSchema.parse(req.body);

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
		return res.status(200).json(data);
	}

	async update(req, res) {
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ message: "Usuário não autenticado" });
		}

		const { name, password } = updateUserSchema.parse(req.body);

		await this.userService.updateUserService(userId, name, password);

		return res.status(204).send();
	}
}

export default UserController;
