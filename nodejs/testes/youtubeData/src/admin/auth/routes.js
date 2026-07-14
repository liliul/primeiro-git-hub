import express from 'express'
import db from '../../db/conection_db.js'
import { HashService, TokenService, RefreshTokenService } from '../utils/utils.js'
import AuthRepository from './authRepository.js'
import AuthService from './authService.js'
import AuthController from './authController.js'
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js'
import { loginLimiter, ipLimiter } from '../middleware/rateLimit.js'
import dotenv from 'dotenv'
dotenv.config()

const expiresIn = process.env.NODE_ENV === "product" ? process.env.JWT_EXPIRES_ADMIN : "15m"
const expiresInRefresh = process.env.NODE_ENV === "product" ? process.env.JWT_EXPIRES_REFRESH_ADMIN : "30d"

const hashService = new HashService()
const tokenService = new TokenService(process.env.JWT_SECRET_ADMIN, expiresIn)
const refreshTokenService = new RefreshTokenService({secret: process.env.JWT_SECRET_REFRESH_ADMIN, expiresIn: expiresInRefresh})
const userRepository = new AuthRepository(db)

const authLoginService = new AuthService({authRepository: userRepository, hashService, tokenService, refreshTokenService})
const authController = new AuthController(authLoginService)
const authenticate = authMiddleware(tokenService)

const routerAuth = express.Router()

routerAuth.post('/login', ipLimiter, loginLimiter, authController.login)

routerAuth.post('/refresh', ipLimiter, authController.refresh)

routerAuth.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user })
})

routerAuth.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({ message: 'Área administrativa' })
})

export default routerAuth