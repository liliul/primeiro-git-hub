import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Pool } from "pg";
import { generateAccessToken, generateRefreshToken } from "../../auth/jwt";
import { refreshSchema } from "./user.schema";

interface Payload {
	sub: string;
}

class RefreshController {
	constructor(private readonly pool: Pool) {}

	async refresh(req: Request, res: Response) {
		const parsed = refreshSchema.safeParse(req.body);

		if (!parsed.success) {
			return res.status(400).json({
				message: "Dados inválidos",
				errors: parsed.error.flatten().fieldErrors,
			});
		}

		const { refreshToken } = parsed.data;

		let payload: Payload;

		try {
			payload = jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET!,
			) as Payload;
		} catch {
			return res.status(401).json({ message: "Refresh token inválido" });
		}

		const tokenExists = await this.pool.query(
			"SELECT id FROM refresh_tokens WHERE token = $1",
			[refreshToken],
		);

		if (!tokenExists.rowCount) {
			return res.status(401).json({ message: "Refresh token revogado" });
		}

		await this.pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
			refreshToken,
		]);

		const newAccessToken = generateAccessToken(payload.sub);
		const newRefreshToken = generateRefreshToken(payload.sub);

		await this.pool.query(
			`INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
			[payload.sub, newRefreshToken],
		);

		return res.json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	}
}

export { RefreshController };
