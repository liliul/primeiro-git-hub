import exepress from "express";
import { constsRole } from "../../../consts/index.js";
import { pool } from "../../../database/postgres.js";
import AuthRoutesJwt from "../../../middlewares/jwt/authRoutesJwt.js";
import { loginRateLimit } from "../../../middlewares/rateLimit/rateLimitLogin.js";
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
	JWT.garantirRole(constsRole.ROLES_USER, constsRole.ROLES_ADMIN, constsRole.ROLES_SUPERADMIN),
	JWT.validarPermissao(constsRole.PERMISSIONS_USER_UPDATE, constsRole.PERMISSIONS_ADMIN_UPDATE),
	userController.update.bind(userController),
);

export default userRoutes;
