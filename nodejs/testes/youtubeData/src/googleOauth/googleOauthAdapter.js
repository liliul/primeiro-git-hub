import qs from "qs"
import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import axios from "axios"
import { AppError } from "../errors/AppError.js"

class GoogleOauthAdapter {
    constructor({CLIENT_ID, CLIENT_SECRET, REDIRECT_URI}) {
        this.CLIENT_ID = CLIENT_ID
        this.CLIENT_SECRET = CLIENT_SECRET
        this.REDIRECT_URI = REDIRECT_URI

        this.googleClient = new OAuth2Client(this.CLIENT_ID)
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

        return {
            sub: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        }
    }

    gerarJwtSign(googleUser) {
        return jwt.sign(
            {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
                sub: googleUser.sub,
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES,
                issuer: "my-video-you",
                audience: "my-video-you-web",
            }
        );
    }
}

export default GoogleOauthAdapter