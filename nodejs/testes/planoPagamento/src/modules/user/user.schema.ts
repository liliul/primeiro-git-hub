import { z } from "zod";

export const createUserSchema = z.object({
	name: z
		.string()
		.min(3, "Nome deve ter no mínimo 3 caracteres")
		.max(100, "Nome muito longo"),

	email: z.string().email("Email inválido"),

	password: z
		.string()
		.min(6, "Senha deve ter no mínimo 6 caracteres")
		.max(100, "Senha muito longa"),
});

export const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "Senha obrigatória"),
});

export const refreshSchema = z.object({
	refreshToken: z.string().min(1, "Refresh token é obrigatório"),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
export type RefreshDTO = z.infer<typeof refreshSchema>;
