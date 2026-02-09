import { z } from "zod";

export const refreshTokenSchema = z.object({
	refreshToken: z.string().trim().uuid({
		version: "v4",
		message: "Refresh token inválido",
	}),
});
