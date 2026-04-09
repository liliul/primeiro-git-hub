import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db/conection_db.js'
// console.log(await db.query('select * from usuarios;'));
// console.log(await db.query('SELECT name, email, criado_em, id FROM usuarios WHERE email = uzumaki@email.com'))

class HashService {
//   async compare(plain, hashed) {
//     return bcrypt.compare(plain, hashed)
//   }

  async compare(password, userPassword) {
    if (password === userPassword) return true;
    
    return false;
  }
  async hash(plain, rounds = 10) {
    return bcrypt.hash(plain, rounds)
  }
}

class TokenService {
  constructor(secret, expiresIn = '1h') {
    this.secret = secret
    this.expiresIn = expiresIn
  }
  sign(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }
  verify(token) {
    return jwt.verify(token, this.secret)
  }
}

function createAuthMiddleware(tokenService) {
  return function authenticate(req, res, next) {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token ausente' })
    }

    try {
      const token = header.split(' ')[1]
      req.user = tokenService.verify(token)
      next()
    } catch {
      res.status(401).json({ error: 'Token inválido ou expirado' })
    }
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Acesso negado' })
    }
    next()
  }
}


class LoginRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async buscaPorEmail(email) {
        const resultado = await this.pool.query('SELECT name, password, email, criado_em, id FROM usuarios WHERE email = $1', [email]);

        return resultado.rows[0] ?? null;
    }
}

class AuthLoginService {
    constructor({loginRepository, hashService, tokenService}) {
        this.loginRepository = loginRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    async fazendoLogin(email, password) {
        const user = await this.loginRepository.buscaPorEmail(email);
        if (!user) throw new Error('Credenciais invalidas.');

        const valida = await this.hashService.compare(password, user.password);
        if (!valida) throw new Error('Comparação de senhas invalidas.');

        const jwtToken = this.tokenService.sign({sub: user.id, role: user.name})

        return {
            jwtToken,
            user: {
                id: user.id,
                email: user.email
            }
        }
    }
}


class AuthController {
  constructor(authLoginService) {
    this.authLoginService = authLoginService
    // bind necessário para manter o 'this' no Express
    this.login = this.login.bind(this)
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await this.authLoginService.fazendoLogin(email, password)
      res.json(result)
    } catch (err) {
      res.status(401).json({ error: err.message })
    }
  }
}

const hashService = new HashService()
const tokenService = new TokenService(process.env.JWT_SECRET)
const userRepository = new LoginRepository(db)

const authLoginService = new AuthLoginService({loginRepository: userRepository, hashService, tokenService})
const authController = new AuthController(authLoginService)
const authenticate = createAuthMiddleware(tokenService)

const routerInjectDepedency = express.Router()

// Rota pública
routerInjectDepedency.post('/login', authController.login)

// Rota protegida — qualquer usuário autenticado
routerInjectDepedency.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user })
})

// Rota protegida — somente admins
routerInjectDepedency.get('/admin', authenticate, requireRole('Naruto uzumaki'), (req, res) => {
  res.json({ message: 'Área administrativa' })
})

export default routerInjectDepedency