import exepress from "express";
import { pool } from "../../database/postgres.js";
import AuthRoutesJwt from "../../middlewares/jwt/authRoutesJwt.js";
import { loginRateLimit } from "../../middlewares/rateLimit/rateLimitLogin.js";
import UserController from "./userController.js";

const userRoutes = exepress.Router();

const userController = new UserController(pool);
const JWT = new AuthRoutesJwt();

userRoutes.post("/create", userController.create.bind(userController));
userRoutes.post(
	"/login",
	loginRateLimit,
	userController.login.bind(userController),
);

userRoutes.get("/me", JWT.auth, userController.me.bind(userController));
userRoutes.put(
	"/update",
	JWT.auth,
	JWT.ensureRole("user", "superadmin"),
	JWT.ensurePermission("USER_UPDATE_SELF"),
	userController.update.bind(userController),
);

export default userRoutes;
