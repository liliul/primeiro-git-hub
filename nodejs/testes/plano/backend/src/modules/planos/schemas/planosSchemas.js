import { z } from "zod";

export const criandoPlanoSchema = z.object({
	name: z
		.string()
		.min(2, "O nome do plano tem que ter no minimo 2 letras.")
		.trim(),
	price: z.number().nonnegative(),
	duration_days: z.number().int().positive().nullable(),
});
