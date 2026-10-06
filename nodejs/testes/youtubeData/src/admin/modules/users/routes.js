import express from "express";
import UserController from "./usersController.js";
import db from '../../../db/conection_db.js';
import { authMiddleware, requireRole } from "../../middleware/authMiddleware.js";

const routerUsers = express.Router();

const user = new UserController(db);

routerUsers.get('/admin/users', authMiddleware, requireRole('admin'), user.searchUserAll);
routerUsers.get('/admin/users/:id', authMiddleware, requireRole('admin'), user.searchUserById);

export default routerUsers;