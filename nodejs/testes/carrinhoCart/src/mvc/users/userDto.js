import { z } from 'zod'

export const register = z.object({
    name: z.string()
    .min(3, { msg: 'Nome tem que pelo menos 3 letras.' })
    .max(100, { msg: 'Nome deve ter maximo 100 letras.' }),
    email: z.string().email({ msg: 'Email invalido' }),
    password: z.string().min(8, { msg: 'A senha deve ter pelo menos 8 caracteres' })
})