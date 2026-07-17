import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

class GenerateJwt {
    signAccessToken(googleUser) {
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
                algorithm: 'HS256'
            }
        )
    }

    signRefreshToken(googleUser) {
        return jwt.sign(
            {
                sub: googleUser.sub,
            },
            process.env.JWT_REFRESH_SECRET,
            { 
                expiresIn: process.env.JWT_REFRESH_EXPIRES,
                issuer: "my-video-you",
                audience: "my-video-you-web",
                algorithm: 'HS256' 
            }
        )
    }
}

export default GenerateJwt