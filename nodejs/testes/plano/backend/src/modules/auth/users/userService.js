import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import IsPasswordArgon2 from "../../../configs/argon2.js";
import { AppError } from "../../../errors/appErrors/index.js";
import logger from "../../../logger/pino.js";
import { resolvePermissionsJwt } from "../../../utils/resolvePermissions.js";
import AuthRefreshTokenRepository from "../refreshToken/authRefreshTokenRepository.js";
import UserRepository from "./userRepository.js";

class UserService {
	constructor(pool) {
		this.pool = pool;

		this.userRepository = new UserRepository(this.pool);
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(pool);

		this.IsPasswordArgon2 = new IsPasswordArgon2();
	}

	async createUserService(name, email, password) {
		const passwordHash = await this.IsPasswordArgon2.hashPassword(password);

		const user = await this.userRepository.createUserRepository({
			name,
			email,
			password: passwordHash,
		});

		if (!user) {
			logger.warn({
				event: "USER_NOT_FOUND",
				userId: user.id,
			});

			throw new AppError("ErroPostgres criando user service", 500);
		}

		logger.info({
			event: "CREATE_USER_SUCCESS",
			userId: user.id,
		});

		return user;
	}

	async loginUserService(email, password) {
		const user = await this.userRepository.loginUserRepository(email);

		if (!user) {
			logger.warn({
				event: "USER_NOT_FOUND",
				userId: user.id,
			});

			throw new AppError("ErrorPostgres login user service", 401);
		}

		const passwordMatch = await this.IsPasswordArgon2.verifyPassword(
			password,
			user.password,
		);

		if (!passwordMatch) {
			logger.warn({
				event: "INVALID_PASSWORD_ATTEMPT",
				userId: user.id,
			});

			throw new AppError("ErrorLoginService senha errada.", 401);
		}

		const permissions = resolvePermissionsJwt(user.roles);

		const newAccessToken = jwt.sign(
			{
				roles: user.roles,
				permissions,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: process.env.JWT_EXPIRES_IN || "15m",
			},
		);

		const newRefreshToken = crypto.randomUUID();

		await this.authRefreshTokenRepository.create({
			userId: user.id,
			token: newRefreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		logger.info({
			event: "AUTH_LOGIN_REQUEST",
			userId: user.id,
		});

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				roles: user.roles,
			},
		};
	}

	async meUserService(id) {
		const user = await this.userRepository.meUserRepository(id);

		if (!user) {
			logger.warn({
				event: "USER_NOT_FOUND",
				userId: user.id,
			});

			throw new AppError(
				"ErrorPostgres id usuario pode não existir me service",
				500,
			);
		}

		logger.info({
			event: "ME_REQUEST",
			userId: user.id,
		});
		return user;
	}

	async updateNameService(userId, name) {
		await this.userRepository.updateNameRepository(userId, name);
	}

	async updatePasswordService(userId, password, newpassword) {
		const user = await this.userRepository.findByUpdatePassword(userId);

		if (!user) {
			logger.warn({
				event: "USER_NOT_FOUND",
				userId: user.id,
			});

			throw new AppError("Usuário não encontrado", 404);
		}

		const verificaPasswords = await this.IsPasswordArgon2.verifyPassword(
			password,
			user.password,
		);

		if (!verificaPasswords) {
			logger.warn({
				event: "VERIFY_PASSWORD_FOUND",
				userId: user.id,
			});

			throw new AppError(
				"ErrorUpdatePassword verificação da senha deu errada.",
			);
		}

		if (password === newpassword) {
			logger.warn({
				event: "CURRENT_PASSWORD_FOUND",
				userId: user.id,
			});

			throw new AppError("A nova senha deve ser diferente da atual", 401);
		}

		const hashedPassword =
			await this.IsPasswordArgon2.hashPassword(newpassword);

		await this.userRepository.updatePasswordRepository(userId, hashedPassword);

		logger.info({
			event: "UPDATE_PASSWORD_SUCCESS",
			userId: user.id,
		});
	}
}

export default UserService;
