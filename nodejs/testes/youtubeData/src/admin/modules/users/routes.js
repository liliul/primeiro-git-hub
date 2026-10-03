import express from "express";
import UserController from "./usersController.js";
import db from '../../../db/conection_db.js';

const routerUsers = express.Router();

const user = new UserController(db);

routerUsers.get('/admin/users', user.searchUserAll);
routerUsers.get('/admin/users/:id', user.searchUserById);

export default routerUsers;