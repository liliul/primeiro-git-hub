import { OAuth2Client } from "google-auth-library"
import GoogleOauthRepository from "./googleOauthRepository.js"
import db from '../db/conection_db.js'
import dotenv from 'dotenv'

dotenv.config()

class RenovandoTokenGoogleOauthService {
    constructor() {
        this.googleOauthRepository = new GoogleOauthRepository(db)
    }

    async pegandoTokenValidoAccessToken(googleId) {
        const tokenDB = await this.googleOauthRepository.encontrandoGoogleID(googleId)
        
        const expired = new Date(tokenDB.expires_at).getTime() <= Date.now() + 60000

        if (!expired) {
            return tokenDB.access_token
        }

        const oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        )

        oauth2Client.setCredentials({
            refresh_token: tokenDB.refresh_token
        })

        const { token } = await oauth2Client.getAccessToken()
        console.log('googleOauthRepository: ', token)
        const expiresAt = new Date(Date.now() + 3600 * 1000)
        await this.googleOauthRepository.atualizandoToken({
            newAccessToken: token,
            expiresAt: expiresAt,
            sub: googleId,
        })

        return token
    }
}

export default RenovandoTokenGoogleOauthService