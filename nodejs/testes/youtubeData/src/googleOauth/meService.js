import jwt from 'jsonwebtoken'
import { AppError } from "../errors/AppError.js"
import { redis } from '../db/redis.js'

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

        const cacheKey = `youtube:meservice:googleoauth:${payload.sub}`
        const cached = await redis.get(cacheKey)
        if (cached) {
            return res.status(201).json({
                source: 'redis',
                user: JSON.parse(cached)
            })
        }

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

        await redis.set(cacheKey, JSON.stringify(user), {
            EX: 1200
        })

        res.status(200).json({ source: 'postgres', user: user })
       } catch (error) {
        next(error)
       }
    } 
}

export default MeService