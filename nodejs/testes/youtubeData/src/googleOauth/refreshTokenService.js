import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import GenerateJwt from "../utils/generateJwt.js";

class RefreshTokenService {
    constructor(googleOauthRepository) {
        this.googleOauthRepository = googleOauthRepository;
        this.generateJwt = new GenerateJwt()

        this.refresh = this.refresh.bind(this)
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken 
            
            if (!refreshToken) {
                throw new AppError(
                    "Refresh token obrigatório",
                    401
                )
            }

            const payload = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
                {
                    issuer: "my-video-you",
                    audience: "my-video-you-web",
                    algorithms: ['HS256']
                }
            )

            const buscaGoogleSub = await this.googleOauthRepository.bucarGoogleIdBySub(payload.sub)

            const tokenDB = await this.googleOauthRepository.buscandoRefreshTokenByToken(refreshToken)

            if (!tokenDB) {
                throw new AppError(
                    "Refresh token inválido",
                    401
                )
            }

            if (new Date(tokenDB.expires_at) < new Date()) {
                throw new AppError(
                    "Refresh token expirado",
                    401
                )
            }

            await this.googleOauthRepository.deletarRefreshTokenById(tokenDB.id)

            const newAccessToken = this.generateJwt.signAccessToken(buscaGoogleSub)
            const newRefreshToken = this.generateJwt.signRefreshToken(buscaGoogleSub)
            
            await this.googleOauthRepository.atualizandoRefreshToken({
                refreshToken: newRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                googleId: payload.sub
            });

            res.cookie(
                "accessToken",
                newAccessToken,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    path: "/",
                    maxAge: 15 * 60 * 1000
                }
            )

            res.cookie(
                "refreshToken",
                newRefreshToken,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            )

            res.status(200).send()
        } catch (error) {
            next(error)
        }
    }
}

export default RefreshTokenService