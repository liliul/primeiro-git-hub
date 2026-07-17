import qs from "qs"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import axios from "axios"
import { AppError } from "../errors/AppError.js"
import GenerateJwt from "../utils/generateJwt.js"

class GoogleOauthAdapter {
    constructor({CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, JWT_SECRET, JWT_EXPIRES}) {
        this.CLIENT_ID = CLIENT_ID
        this.CLIENT_SECRET = CLIENT_SECRET
        this.REDIRECT_URI = REDIRECT_URI
        this.JWT_SECRET = JWT_SECRET
        this.JWT_EXPIRES = JWT_EXPIRES

        this.googleClient = new OAuth2Client(this.CLIENT_ID)
        this.generateJwt = new GenerateJwt()
    }

    construindoUrlGoogleOaut2() {
        return (
            "https://accounts.google.com/o/oauth2/v2/auth?" +
                new URLSearchParams({
                client_id: this.CLIENT_ID,
                redirect_uri: this.REDIRECT_URI,
                response_type: "code",
                scope: [
                    "openid",
                    "email",
                    "profile",
                    "https://www.googleapis.com/auth/youtube.readonly"
                ].join(" "),
                access_type: "offline",
                include_granted_scopes: "true",
                prompt: "consent"
            })
        )
    }

    async chamandoGoogleApisToken(code) {
        const body = qs.stringify({
            code,
            client_id: this.CLIENT_ID,
            client_secret: this.CLIENT_SECRET,
            redirect_uri: this.REDIRECT_URI,
            grant_type: "authorization_code",
        })

        const data = await axios.post(
            "https://oauth2.googleapis.com/token",
            body,
            {
                headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        
        return data
    }

    async verifacandoIDToken(id_token) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: id_token,
            audience: this.CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload.email_verified) {
            throw new AppError("Email não verificado", 403)
        }

        return payload
    }

    gerarJwtSign(googleUser) {
        return jwt.sign(
            {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                sub: googleUser.sub,
            },
            this.JWT_SECRET,
            { 
                expiresIn: this.JWT_EXPIRES,
                issuer: "my-video-you",
                audience: "my-video-you-web",
                algorithm: 'HS256' 
            }
        );
    }

    gerarJwtTokens(googleUser) {
        const accessToken = this.generateJwt.signAccessToken(googleUser)
        if (!accessToken) {
            throw new AppError('Error: Na geração do access token jwt', 500)
        }

        const refreshToken = this.generateJwt.signRefreshToken(googleUser)
        if (!refreshToken) {
            throw new AppError('Error: Na geração do refresh token jwt', 500)
        }
        
        return {
            accessToken,
            refreshToken
        }
        
    }
}

export default GoogleOauthAdapter