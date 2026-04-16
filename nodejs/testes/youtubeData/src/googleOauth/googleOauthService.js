import { AppError } from "../errors/AppError.js"

class GoogleOauthService {
    constructor(utils, repository) {
        this.utils = utils
        this.repository = repository
    }

    googleService() {
        const googleOauth2 = this.utils.googleOauth2()            

        if(!googleOauth2) {
            throw new AppError("Error", 401)
        }

        return googleOauth2
    }

    async googleCallbackService(code) {
       
        const data = await this.utils.googleApisToken(code)

        const {
            access_token,
            refresh_token,
            expires_in,
            id_token
        } = data
        
        const googleUser = await this.utils.verifacandoIDToken(id_token)
        console.log('googleUser: ', googleUser)
        
        const expiresAt = new Date(Date.now() + expires_in * 1000)
        await this.repository.googleOauthTokens({
            sub: googleUser.sub,
            email: googleUser.email,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt
        })


        const token = this.utils.googleJwt(googleUser)

        return token
    }
}

export default GoogleOauthService