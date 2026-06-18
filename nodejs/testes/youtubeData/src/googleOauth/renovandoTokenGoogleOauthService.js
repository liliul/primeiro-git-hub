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

        if (!tokenDB) {
            throw new AppError(
                "Conta Google não encontrada",
                404
            )
        }
        
        const expired = new Date(tokenDB.expires_at).getTime() <= Date.now() + 60000

        if (!expired) {
            return tokenDB.access_token
        }

        const oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        )

        if (!tokenDB.refresh_token) {
            throw new AppError(
                "Refresh token não encontrado",
                401
            )
        }

        oauth2Client.setCredentials({
            refresh_token: tokenDB.refresh_token
        })

        const { credentials } = await oauth2Client.refreshAccessToken()
        const accessToken = credentials.access_token
        const expiresAt = new Date(credentials.expiry_date)
        
        console.log('googleOauthRepository: ', accessToken)

        await this.googleOauthRepository.atualizandoToken({
            newAccessToken: accessToken,
            expiresAt: expiresAt,
            sub: googleId,
        })

        return accessToken
    }
}

export default RenovandoTokenGoogleOauthService