import z, { ZodError } from 'zod'

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .max(256),
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

      res.cookie("authAccessToken", result.jwtAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 15 * 60 * 1000
      })

      res.cookie("authRefreshToken", result.jwtRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000
      })

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
      const token = req.cookies.authRefreshToken
      
      const resultado = await this.authService.fazendoRefreshToken(token)

      res.cookie("authAccessToken", resultado.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 15 * 60 * 1000
      })

      res.cookie("authRefreshToken", resultado.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60 * 1000
      })
      
      res.status(200).send()
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const refresh = req.cookies.authRefreshToken

      await this.authService.fazendoLogout(refresh)

      res.clearCookie("authAccessToken", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/"
      });

      res.clearCookie("authRefreshToken", {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/"
      });
     
      // res.redirect('/auth/login')
      res.status(204).send()
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