import z, { ZodError } from 'zod'

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .max(72),
})

export default class AuthController {
  constructor(authService) {
    this.authService = authService
    this.login = this.login.bind(this)
  }

  async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body)
      
      const result = await this.authService.fazendoLogin(email, password)
      res.json(result)
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          errors: err.issues.map(e => ({
            field: e.path[0],
            message: e.message
          }))
        })
      }

      next(err)
    }
  }
}