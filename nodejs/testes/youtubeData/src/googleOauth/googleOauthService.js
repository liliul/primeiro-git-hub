import { AppError } from "../errors/AppError.js"

class GoogleOauthService {
    constructor(googleOauthAdapter, googleOauthRepository) {
        this.googleOauthAdapter = googleOauthAdapter
        this.googleOauthRepository = googleOauthRepository
    }

    googleOauthService() {
        const googleOauth2 = this.googleOauthAdapter.construindoUrlGoogleOaut2()            

        if(!googleOauth2) {
            throw new AppError("Erro na construção da url do google oauth2", 401)
        }

        return googleOauth2
    }

    async googleCallbackService(code) {
       
        const { data } = await this.googleOauthAdapter.chamandoGoogleApisToken(code)

        const {
            access_token,
            refresh_token,
            expires_in,
            id_token
        } = data
        
        const googleUser = await this.googleOauthAdapter.verifacandoIDToken(id_token)
        
        const expiresAt = new Date(Date.now() + expires_in * 1000)
        await this.googleOauthRepository.googleOauthTokens({
            sub: googleUser.sub,
            email: googleUser.email,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt
        })


        const token = this.googleOauthAdapter.gerarJwtSign(googleUser)

        return token
    }
}

export default GoogleOauthService