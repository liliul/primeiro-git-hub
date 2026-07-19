import express from 'express'
import db from '../../db/conection_db.js'
import { HashService, TokenService, RefreshTokenService, HashTokenService } from '../utils/utils.js'
import AuthRepository from './authRepository.js'
import AuthService from './authService.js'
import AuthController from './authController.js'
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js'
import { loginLimiter, ipLimiter } from '../middleware/rateLimit.js'
import dotenv from 'dotenv'
import { guestMiddleware } from '../middleware/guestMiddleware.js'
dotenv.config()

const expiresIn = process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRES_ADMIN : "15m"
const expiresInRefresh = process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRES_REFRESH_ADMIN : "30d"

const hashService = new HashService()
const hashTokenService = new HashTokenService()
const tokenService = new TokenService(process.env.JWT_SECRET_ADMIN, expiresIn)
const refreshTokenService = new RefreshTokenService({secret: process.env.JWT_SECRET_REFRESH_ADMIN, expiresIn: expiresInRefresh})
const userRepository = new AuthRepository(db, hashTokenService)

const authLoginService = new AuthService({authRepository: userRepository, hashService, tokenService, refreshTokenService})
const authController = new AuthController(authLoginService)
const authenticate = authMiddleware(tokenService)
const guest = guestMiddleware(tokenService)

const routerAuth = express.Router()

routerAuth.post('/admin/login', ipLimiter, loginLimiter, authController.login)
routerAuth.post('/admin/refresh', ipLimiter, authController.refresh)
routerAuth.post('/admin/logout', ipLimiter, authController.logout)
routerAuth.get('/admin/me', ipLimiter, authenticate, requireRole('admin'), authController.me)

routerAuth.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({ message: 'Área administrativa' })
})
routerAuth.get("/admin/login", ipLimiter, guest, (req, res) => {
  res.render("dashboard/adminLogin")
})
routerAuth.get("/admin/user", (req, res) => {
  res.render("dashboard/adminMe")
})

export default routerAuth