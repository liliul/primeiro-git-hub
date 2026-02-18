import z from "zod";

export const updatePasswordSchema = z.object({
	newPassword: z
		.string()
		.min(8)
		.regex(/[A-Z]/, "Precisa de letra maiúscula")
		.regex(/[0-9]/, "Precisa de número"),
});

export const validarEmailSchema = z.object({
	email: z.string().email("Email inválido"),
});
