import { AppError } from "../errors/AppError.js"

class GoogleOauthService {
    constructor(googleOauthAdapter, googleOauthRepository) {
        this.googleOauthAdapter = googleOauthAdapter
        this.googleOauthRepository = googleOauthRepository
    }

    construaGoogleOauthService() {
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
       
        await this.googleOauthRepository.criarGoogleUsers({
            sub: googleUser.sub, 
            email: googleUser.email, 
            email_verified: googleUser.email_verified, 
            name: googleUser.name, 
            given_name: googleUser.given_name, 
            family_name: googleUser.family_name, 
            picture: googleUser.picture, 
            iss: googleUser.iss, 
            azp: googleUser.azp, 
            aud: googleUser.aud, 
            at_hash: googleUser.at_hash, 
            iat: googleUser.iat, 
            exp: googleUser.exp
        })
        
        const expiresAt = new Date(Date.now() + expires_in * 1000)
        await this.googleOauthRepository.googleOauthTokens({
            sub: googleUser.sub,
            email: googleUser.email,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt
        })

        const token = this.googleOauthAdapter.gerarJwtTokens(googleUser)
        
        await this.googleOauthRepository.atualizandoRefreshToken({
            refreshToken: token.refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            googleId: googleUser.sub
        })
        
        return token
    }
}

export default GoogleOauthService