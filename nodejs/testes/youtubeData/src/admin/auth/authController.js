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
    this.refresh = this.refresh.bind(this)
    this.logout = this.logout.bind(this)
    this.me = this.me.bind(this)
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

  async refresh(req, res, next) {
    try {
      const token = req.body.token 
      
      const resultado = await this.authService.fazendoRefreshToken(token)
      
      res.status(201).json({ message: resultado })
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const refresh = req.body.token

      await this.authService.fazendoLogout(refresh)

      // res.redirect('/auth')
      res.send()
    } catch (error) {
      next(error)
    }
  }

  async me(req, res, next) {
    try {
      const userId = req.user

      const user = await this.authService.fazendoMe(userId.id)

      res.status(200).json({ me: user })
    } catch (error) {
      next(error)
    }
  }
}