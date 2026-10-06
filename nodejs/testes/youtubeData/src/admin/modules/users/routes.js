import express from "express";
import UserController from "./usersController.js";
import db from '../../../db/conection_db.js';
import { TokenService } from "../../utils/utils.js";
import { authMiddleware, requireRole } from "../../middleware/authMiddleware.js";
import env from 'dotenv'

env.config()

const routerUsers = express.Router();

const expiresIn = process.env.NODE_ENV === "production" ? process.env.JWT_EXPIRES_ADMIN : "15m"

const tokenService = new TokenService(process.env.JWT_SECRET_ADMIN, expiresIn);
const user = new UserController(db);
const authenticate = authMiddleware(tokenService);

routerUsers.get('/admin/users', authenticate, requireRole('admin'), user.searchUserAll);
routerUsers.get('/admin/users/:id', authenticate, requireRole('admin'), user.searchUserById);

export default routerUsers;