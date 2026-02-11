import exepress from "express";
import { constsRateLimit, constsRole } from "../../../consts/index.js";
import { pool } from "../../../database/postgres.js";
import AuthRoutesJwt from "../../../middlewares/jwt/authRoutesJwt.js";
import {
	authRateLimit,
	publicRateLimit,
} from "../../../middlewares/rateLimit/rateLimit.js";
import UserController from "./userController.js";

const userRoutes = exepress.Router();

const userController = new UserController(pool);
const JWT = new AuthRoutesJwt();

userRoutes.post(
	"/create",
	publicRateLimit(constsRateLimit.USER_CREATE_RATELIMIT),
	userController.create.bind(userController),
);
userRoutes.post(
	"/login",
	publicRateLimit(constsRateLimit.USER_LOGIN_RATELIMIT),
	userController.login.bind(userController),
);

userRoutes.get(
	"/me",
	JWT.auth,
	authRateLimit(constsRateLimit.USER_ME_RATELIMIT),
	userController.me.bind(userController),
);
userRoutes.put(
	"/update",
	JWT.auth,
	authRateLimit(constsRateLimit.USER_UPDATE_RATELIMIT),
	JWT.garantirRole(
		constsRole.ROLES_USER,
		constsRole.ROLES_ADMIN,
		constsRole.ROLES_SUPERADMIN,
	),
	JWT.validarPermissao(
		constsRole.PERMISSIONS_USER_UPDATE,
		constsRole.PERMISSIONS_ADMIN_UPDATE,
	),
	userController.update.bind(userController),
);

userRoutes.put(
	"/update/newpassword",
	JWT.auth,
	authRateLimit(constsRateLimit.USER_UPDATEPASSWORD_RETALIMIT),
	JWT.garantirRole(
		constsRole.ROLES_USER,
		constsRole.ROLES_ADMIN,
		constsRole.ROLES_SUPERADMIN,
	),
	JWT.validarPermissao(
		constsRole.PERMISSIONS_USER_UPDATE,
		constsRole.PERMISSIONS_ADMIN_UPDATE,
	),
	userController.updatePassword.bind(userController),
);

export default userRoutes;
