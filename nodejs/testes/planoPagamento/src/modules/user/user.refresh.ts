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

		const storedToken = await this.pool.query(
			`SELECT token FROM refresh_tokens WHERE user_id = $1`,
			[payload.sub],
		);

		if (!storedToken.rowCount) {
			return res.status(401).json({ message: "Refresh token inexistente" });
		}

		if (storedToken.rows[0].token !== refreshToken) {
			return res.status(401).json({ message: "Refresh token revogado" });
		}

		const newAccessToken = generateAccessToken(payload.sub);
		const newRefreshToken = generateRefreshToken(payload.sub);

		await this.pool.query(
			`UPDATE refresh_tokens
			 SET token = $1, expires_at = NOW() + INTERVAL '7 days'
			 WHERE user_id = $2`,
			[newRefreshToken, payload.sub],
		);

		return res.json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	}
}

export { RefreshController };
