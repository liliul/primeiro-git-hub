import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(3, "Nome é obrigatório"),
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
	email: z.string().email("Email inválido"),
	password: z.string().min(6, "Senha obrigatória"),
});

export const updateUserSchema = z
	.object({
		name: z.string().min(2, "Nome muito curto").optional(),
		password: z.string().min(6, "Senha muito curta").optional(),
		newpassword: z.string().min(6, "Senha muito curta").optional(),
	})
	.refine((data) => data.name || data.password || data.newpassword, {
		message: "Informe ao menos nome ou senha para atualizar",
	});
