import { z } from "zod"

export const productSchema = z.object({
  name: z.string()
    .min(3, "O nome do produto deve ter pelo menos 3 caracteres"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("Preço deve ser >= 0")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative("Stock deve ser >= 0")
  )
})