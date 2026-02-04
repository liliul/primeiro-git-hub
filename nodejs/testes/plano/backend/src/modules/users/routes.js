import exepress from "express";
import { pool } from "../../database/postgres.js";
import AuthRoutesJwt from "../../middlewares/jwt/authRoutesJwt.js";
import UserController from "./userController.js";

const userRoutes = exepress.Router();

const userController = new UserController(pool);
const JWT = new AuthRoutesJwt();

userRoutes.post("/create", userController.create.bind(userController));
userRoutes.post("/login", userController.login.bind(userController));

userRoutes.get("/me", JWT.auth, userController.me.bind(userController));

export default userRoutes;
