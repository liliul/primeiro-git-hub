import { AppError } from "../errors/AppError.js"

class LogoutService {
    constructor(googleOauthRepository) {
        this.googleOauthRepository = googleOauthRepository

        this.logout = this.logout.bind(this)
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken
            console.log('logout',refreshToken)

            if (!refreshToken) {
                throw new AppError( "Refresh token obrigatório", 401)
            }

            const buscandoRefreshToken = await this.googleOauthRepository.buscandoRefreshTokenByToken(refreshToken)
            if (!buscandoRefreshToken) {
                throw new AppError('Error: busca pelo refresh token não existe.', 401)
            }
            
            await this.googleOauthRepository.deletarRefreshTokenById(buscandoRefreshToken.id)

            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            // res.status(200).json({ message: true })
            res.redirect("/")
        } catch (error) {
         next(error)   
        }
    }
}

export default LogoutService