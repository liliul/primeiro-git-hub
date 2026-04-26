import express from 'express'
import db from '../../db/conection_db.js'
import { HashService, TokenService } from '../utils/utils.js'
import AuthRepository from './authRepository.js'
import AuthService from './authService.js'
import AuthController from './authController.js'
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js'
import { loginLimiter, ipLimiter } from '../middleware/rateLimit.js'
import dotenv from 'dotenv'
dotenv.config()

const expiresIn = process.env.NODE_ENV === "product" ? process.env.JWT_EXPIRES : "5h"
const hashService = new HashService()
const tokenService = new TokenService(process.env.JWT_SECRET_ADMIN, expiresIn)
const userRepository = new AuthRepository(db)

const authLoginService = new AuthService({authRepository: userRepository, hashService, tokenService})
const authController = new AuthController(authLoginService)
const authenticate = authMiddleware(tokenService)

const routerAuth = express.Router()

routerAuth.post('/login', ipLimiter, loginLimiter, authController.login)

routerAuth.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user })
})

routerAuth.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({ message: 'Área administrativa' })
})

export default routerAuth