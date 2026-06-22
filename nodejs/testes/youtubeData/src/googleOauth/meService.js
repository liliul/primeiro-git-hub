import jwt from 'jsonwebtoken'
import { AppError } from "../errors/AppError.js"

class MeService {
    constructor(googleOauthRepository) {
        this.googleOauthRepository = googleOauthRepository

        this.me = this.me.bind(this)
    }

    async me(req, res, next) {
       try {
        const accessToken = req.cookies.accessToken
        
        if (!accessToken) {
            throw new AppError('AccessToken é obrigatorio.', 401)
        }
        const payload = jwt.verify(
            accessToken,
            process.env.JWT_SECRET,
            {
                issuer: "my-video-you",
                audience: "my-video-you-web",
            }
        )

        const googleUserInfos = await this.googleOauthRepository.bucarGoogleIdBySub(payload.sub)
        if (!googleUserInfos) {
            throw new AppError('busca pelas informações falhou.', 401)
        }

        const user = {
            sub: googleUserInfos.sub,
            email: googleUserInfos.email,
            name: googleUserInfos.name,
            picture: googleUserInfos.picture
        }

        res.status(200).json({ user: user })
       } catch (error) {
        next(error)
       }
    } 
}

export default MeService