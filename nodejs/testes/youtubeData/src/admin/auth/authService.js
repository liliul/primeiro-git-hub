import { AppError } from "../../errors/AppError.js";

export default class AuthService {
    constructor({authRepository, hashService, tokenService}) {
        this.authRepository = authRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    async fazendoLogin(email, password) {
        const user = await this.authRepository.buscaPorEmail(email);
        if (!user) throw new AppError('Email e senha obrigatoria.', 400);

        const valida = await this.hashService.compare(password, user.password);
        if (!valida) throw new AppError('Comparação de senhas invalidas.', 401);

        const jwtToken = this.tokenService.sign({sub: user.id, name: user.name, role: user.role})

        return {
            jwtToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }
}
