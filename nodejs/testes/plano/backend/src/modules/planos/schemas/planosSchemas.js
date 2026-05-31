import { z } from "zod";

export const criandoPlanoSchema = z.object({
	name: z
		.string()
		.min(2, "O nome do plano tem que ter no minimo 2 letras.")
		.trim(),
	price: z.number().nonnegative(),
	duration_days: z.number().int().positive().nullable(),
});

export const atualizandoPlanoSchema = criandoPlanoSchema
	.partial()
	.refine(
		(data) => Object.keys(data).length > 0,
		"Informe ao menos um campo para atualizar",
	);
