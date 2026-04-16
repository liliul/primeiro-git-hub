import { AppError } from "../errors/AppError.js"

class GoogleOauthService {
    constructor(utilsAdapter, repository) {
        this.utilsAdapter = utilsAdapter
        this.repository = repository
    }

    googleOauthService() {
        const googleOauth2 = this.utilsAdapter.googleOaut2()            

        if(!googleOauth2) {
            throw new AppError("Error", 401)
        }

        return googleOauth2
    }

    async googleCallbackService(code) {
       
        const { data } = await this.utilsAdapter.googleApisToken(code)

        const {
            access_token,
            refresh_token,
            expires_in,
            id_token
        } = data
        
        const googleUser = await this.utilsAdapter.verifacandoIDToken(id_token)
        
        const expiresAt = new Date(Date.now() + expires_in * 1000)
        await this.repository.googleOauthTokens({
            sub: googleUser.sub,
            email: googleUser.email,
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt
        })


        const token = this.utilsAdapter.googleJwt(googleUser)

        return token
    }
}

export default GoogleOauthService