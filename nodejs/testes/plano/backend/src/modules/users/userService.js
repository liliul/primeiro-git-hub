import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../../errors/appErrors/index.js";
import AuthRefreshTokenRepository from "../auth/authRefreshTokenRepository.js";
import UserRepository from "./userRepository.js";

class UserService {
	constructor(pool) {
		this.pool = pool;

		this.userRepository = new UserRepository(this.pool);
		this.authRefreshTokenRepository = new AuthRefreshTokenRepository(pool);
	}

	async createUserService(name, email, password) {
		const passwordHash = await bcrypt.hash(password, 10);

		const user = await this.userRepository.createUserRepository({
			name,
			email,
			password: passwordHash,
		});

		if (!user) {
			throw new AppError("ErroPostgres criando user service", 500);
		}

		return user;
	}

	async loginUserService(email, password) {
		const user = await this.userRepository.loginUserRepository(email);

		if (!user) {
			throw new AppError("ErrorPostgres login user service", 401);
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError("ErrorPassword password bcrypt", 401);
		}

		const token = jwt.sign(
			{
				sub: user.id,
				roles: user.roles,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || "15m",
			},
		);

		const refreshToken = crypto.randomUUID();

		await this.authRefreshTokenRepository.create({
			userId: user.id,
			token: refreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});

		return {
			token,
			refreshToken,
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
			throw new AppError(
				"ErrorPostgres id usuario pode não existir me service",
				500,
			);
		}

		return user;
	}
}

export default UserService;
