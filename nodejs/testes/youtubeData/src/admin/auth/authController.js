export default class AuthController {
  constructor(authService) {
    this.authService = authService
    this.login = this.login.bind(this)
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      
      const result = await this.authService.fazendoLogin(email, password)
      res.json(result)
    } catch (err) {
      next(err)
    }
  }
}