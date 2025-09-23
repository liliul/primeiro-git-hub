import { z } from 'zod'

export const registerShema = z.object({
    name: z.string()
    .min(3, { message: 'Nome tem que pelo menos 3 letras.' })
    .max(100, { message: 'Nome deve ter maximo 100 letras.' }),
    email: z.string().email({ message: 'Email invalido' }),
    password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})

export const loginShema = z.object({
    email: z.string().email({ error: 'Email invalido'}),
    password: z.string().min(8, { error: 'A senha deve conter pelo menos 8 caracteres' })
})