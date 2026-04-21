import { AppError } from "../errors/AppError.js"
import dotenv from 'dotenv'

dotenv.config()

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

    async pegandoTokenValidoAccessToken(googleId) {
        const tokenDB = await this.googleOauthRepository.encontrandoGoogleID(googleId)

        const expired =
        new Date(tokenDB.expires_at).getTime() <= Date.now() + 60000

        if (!expired) {
        return tokenDB.access_token
        }

        // renovar
        const oauth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
        )

        oauth2Client.setCredentials({
        refresh_token: tokenDB.refresh_token
        })

        const { token } = await oauth2Client.getAccessToken()
        console.log(token)

        // await this.googleOauthRepository.updateAccessToken(
        // googleId,
        // token,
        // new Date(Date.now() + 3600 * 1000)
        // )

        // return token
  }
}

export default GoogleOauthService