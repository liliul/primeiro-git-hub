import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(3, "Nome é obrigatório"),
	email: z.string().email("Email inválido"),
	password: z
		.string()
		.min(8)
		.regex(/[A-Z]/, "Precisa de letra maiúscula")
		.regex(/[0-9]/, "Precisa de número"),
});

export const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "Senha obrigatória"),
});

export const updateUserSchema = z.object({
	name: z.string().min(3, "Nome muito curto"),
});

export const updatePasswordSchema = z.object({
	password: z.string().min(6, "Senha muito curta"),
	newpassword: z
		.string()
		.min(8)
		.regex(/[A-Z]/, "Precisa de letra maiúscula")
		.regex(/[0-9]/, "Precisa de número"),
});
