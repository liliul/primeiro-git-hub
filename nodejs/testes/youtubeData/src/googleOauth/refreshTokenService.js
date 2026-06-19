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
            const refreshToken = req.cookie.refreshToken
            // const refreshToken = req.body.refreshToken
            
            if (!refreshToken) {
                throw new AppError(
                    "Refresh token obrigatório",
                    401
                )
            }

            const payload = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            )

            const buscaGoogleSub = await this.googleOauthRepository.bucarGoogleIdBySub(payload.sub)
            console.log('bb', buscaGoogleSub);

            const tokenDB = await this.googleOauthRepository.buscandoRefreshTokenByToken(refreshToken);

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
            console.log(newAccessToken, ':', newRefreshToken);
            
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
                    sameSite: "lax",
                    secure: false,
                    maxAge: 15 * 60 * 1000
                }
            )

            res.cookie(
                "refreshToken",
                newRefreshToken,
                {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            )

            res.status(201).json({ message: true })
        } catch (error) {
            next(error)
        }
    }
}

export default RefreshTokenService