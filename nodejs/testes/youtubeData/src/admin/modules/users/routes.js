import express from "express";
import UserController from "./usersController.js";
import db from '../../../db/conection_db.js';
import { TokenService } from "../../utils/utils.js";
import { authMiddleware, requireRole } from "../../middleware/authMiddleware.js";
import { ipLimiter } from "../../middleware/rateLimit.js";
import env from 'dotenv'
import UsersRepository from "./usersRepository.js";
import UsersService from "./usersService.js";

env.config()

const routerUsers = express.Router();

const expiresIn = process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRES_ADMIN : "15m"
const tokenService = new TokenService(process.env.JWT_SECRET_ADMIN, expiresIn);

const repository = new UsersRepository(db);
const service = new UsersService(repository);
const user = new UserController(service);

const authenticate = authMiddleware(tokenService);

routerUsers.get('/admin/users', ipLimiter, authenticate, requireRole('admin'), user.searchUsersAll);
routerUsers.get('/admin/users/:id', ipLimiter, authenticate, requireRole('admin'), user.searchUserById);

routerUsers.get('/admin-users', (req, res) => {
    res.render('dashboard/pages/users')
});

export default routerUsers;