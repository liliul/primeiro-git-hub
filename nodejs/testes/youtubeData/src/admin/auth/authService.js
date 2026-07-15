import { AppError } from "../../errors/AppError.js";

export default class AuthService {
    constructor({authRepository, hashService, tokenService, refreshTokenService}) {
        this.authRepository = authRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
        this.refreshTokenService = refreshTokenService
    }

    async fazendoLogin(email, password) {
        const user = await this.authRepository.buscaPorEmail(email);
        if (!user) throw new AppError('Email e senha obrigatoria.', 400);

        const valida = await this.hashService.compare(password, user.password);
        if (!valida) throw new AppError('Comparação de senhas invalidas.', 401);

        const jwtAccessToken = this.tokenService.sign({id: user.id, name: user.name, email: user.email, role: user.role})
        const jwtRefreshToken = this.refreshTokenService.sign({id: user.id})

        await this.authRepository.atualizandoRefreshToken({
            refreshToken: jwtRefreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            id: user.id
        })

        return {
            jwtAccessToken,
            jwtRefreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }

    async fazendoRefreshToken(token) {
        if(!token) {
            throw new AppError('Token invalido.', 401)
        }
        
        const verificandoToken = this.refreshTokenService.verify(token)
        if(!verificandoToken) {
            throw new AppError('Erro ao verificar token', 500)
        }

        const buscarUsuario = await this.authRepository.buscaUsuarioById(verificandoToken.id)
        if (!buscarUsuario) {
            throw new AppError('Usuario não existe.', 500)
        }
        
        const buscarRefreshToken = await this.authRepository.buscarRefreshTokenByToken(token)
        if (!buscarRefreshToken) {
            throw new AppError(
                "Refresh token inválido",
                401
            )
        }

        if (new Date(buscarRefreshToken.expires_at) < new Date()) {
            throw new AppError(
                "Refresh token expirado",
                401
            )
        }

        await this.authRepository.deletarRefreshTokenById(buscarRefreshToken.id)

        const accessToken = this.tokenService.sign({
            id: buscarUsuario.id, 
            name: buscarUsuario.name, 
            email: buscarUsuario.email, 
            role: buscarUsuario.role
        })

        const refreshToken = this.refreshTokenService.sign({id: buscarUsuario.id})

        await this.authRepository.atualizandoRefreshToken({
            refreshToken: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            id: buscarUsuario.id
        })

        return {
            accessToken,
            refreshToken
        }
    }

    async fazendoLogout(refreshToken) {
        if (!refreshToken) {
            throw new AppError('Token não existe.', 401)
        }

        const buscarRefreshToken = await this.authRepository.buscarRefreshTokenByToken(refreshToken)
        if (!buscarRefreshToken) {
            throw new AppError('Erro na busca com refreh token.', 500)
        }

        await this.authRepository.deletarRefreshTokenById(buscarRefreshToken.id)
    }

    async fazendoMe(userId) {
        if (!userId) {
            throw new AppError('userId é obrigatorio.', 401)
        }

        const buscarUsuario = await this.authRepository.buscaUsuarioById(userId)
        if (!buscarUsuario) {
            throw new AppError('Erro usuario não encontrado.', 500)
        }

       return buscarUsuario
    }
}
