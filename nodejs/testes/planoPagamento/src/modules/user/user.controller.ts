import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import type { Pool } from "pg";
import { generateAccessToken, generateRefreshToken } from "../../auth/jwt";
import { createUserSchema, loginSchema, logoutSchema } from "./user.schema";

class UserController {
	constructor(private readonly pool: Pool) {}

	async createUser(req: Request, res: Response) {
		const parsed = createUserSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				message: "Dados inválidos",
				errors: parsed.error.flatten().fieldErrors,
			});
		}

		const { name, email, password } = parsed.data;

		const userExists = await this.pool.query(
			"SELECT id FROM users WHERE email = $1",
			[email],
		);

		if (userExists.rowCount) {
			return res.status(409).json({ message: "Usuário já existe" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await this.pool.query(
			`INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
			[name, email, hashedPassword],
		);

		return res.status(201).json({
			user: result.rows[0],
		});
	}

	async login(req: Request, res: Response) {
		const parsed = loginSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				message: "Dados inválidos",
				errors: parsed.error.flatten().fieldErrors,
			});
		}

		const { email, password } = parsed.data;

		const userResult = await this.pool.query(
			"SELECT id, password FROM users WHERE email = $1",
			[email],
		);

		if (!userResult.rowCount) {
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		const user = userResult.rows[0];

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Credenciais inválidas" });
		}

		const accessToken = generateAccessToken(user.id);
		const refreshToken = generateRefreshToken(user.id);

		await this.pool.query(
			`
		INSERT INTO refresh_tokens (user_id, token, expires_at)
		VALUES ($1, $2, NOW() + INTERVAL '7 days')
		ON CONFLICT (user_id)
		DO UPDATE SET
			token = EXCLUDED.token,
			expires_at = EXCLUDED.expires_at
		`,
			[user.id, refreshToken],
		);

		return res.json({
			accessToken,
			refreshToken,
		});
	}

	async me(req: Request, res: Response) {
		if (!req.userId) {
			return res.status(401).json({ message: "Não autenticado" });
		}

		const result = await this.pool.query(
			`SELECT id, name, email, roles, created_at
       FROM users
       WHERE id = $1`,
			[req.userId],
		);

		if (!result.rowCount) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		return res.json({
			user: result.rows[0],
		});
	}

	async logout(req: Request, res: Response) {
		const result = logoutSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Dados inválidos",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { refreshToken } = result.data;

		await this.pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [
			refreshToken,
		]);

		return res.status(204).send();
	}
}

export { UserController };
