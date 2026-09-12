import { cookies } from "./cookies.js"

class LogoutService {
    constructor(googleOauthRepository) {
        this.googleOauthRepository = googleOauthRepository

        this.logout = this.logout.bind(this)
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (refreshToken) {
                const buscandoRefreshToken = await this.googleOauthRepository.buscandoRefreshTokenByToken(refreshToken)
                
                if (buscandoRefreshToken) {
                    await this.googleOauthRepository.deletarRefreshTokenById(buscandoRefreshToken.id)
                    await this.googleOauthRepository.deletarGoogleOauthTokensBySub(buscandoRefreshToken.google_id)
                }
            }

            res.clearCookie("accessToken", cookies.logoutAccessToken)
            res.clearCookie("refreshToken", cookies.logoutRefreshToken)
            
            res.status(204).send()
        } catch (error) {
         next(error)   
        }
    }
}

export default LogoutService