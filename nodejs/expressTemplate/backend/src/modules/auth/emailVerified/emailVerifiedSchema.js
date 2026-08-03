import { z } from "zod";

export const emailUserSchema = z.object({
    email: z.string().email("Email inválido")
})