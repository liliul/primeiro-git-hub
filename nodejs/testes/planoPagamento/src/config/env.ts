import { z } from "zod";

const envSchema = z.object({
	JWT_ACCESS_SECRET: z.string().min(1),
	JWT_REFRESH_SECRET: z.string().min(1),

	JWT_ACCESS_EXPIRES: z.coerce.number().int().positive(),
	JWT_REFRESH_EXPIRES: z.coerce.number().int().positive(),
});

export const env = envSchema.parse(process.env);
