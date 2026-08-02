import exepress from "express";
import { constsRateLimit, constsRole } from "../../../consts/index.js";
import { pool } from "../../../database/postgres.js";
import AuthRoutesJwt from "../../../middlewares/jwt/authRoutesJwt.js";
import {
	authRateLimit,
	publicRateLimit,
} from "../../../middlewares/rateLimit/rateLimit.js";
import UserController from "./userController.js";
import EmailVerifiedController from "../emailVerified/emailVerifiedController.js";
import path from "node:path";

const __dirname = path.resolve();

const userRoutes = exepress.Router();
const emailVerifiedController = new EmailVerifiedController(pool)
const userController = new UserController(pool);
const JWT = new AuthRoutesJwt();

userRoutes.post(
	"/create",
	publicRateLimit(constsRateLimit.USER_CREATE_RATELIMIT),
	userController.create,
);
userRoutes.post(
	"/login",
	publicRateLimit(constsRateLimit.USER_LOGIN_RATELIMIT),
	userController.login,
);

userRoutes.get(
	"/me",
	JWT.auth,
	authRateLimit(constsRateLimit.USER_ME_RATELIMIT),
	userController.me,
);
userRoutes.put(
	"/update/name",
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
	userController.updateName,
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
	userController.updatePassword,
);

userRoutes.get(
	"/email-verified",
	emailVerifiedController.emailVerifield
);

// userRoutes.get(
// 	"/resend-verification",
// 	(req, res) => {
// 		res.sendFile(path.join(__dirname, "public/reenvioConfirmarEmail.html"));
// 	},
// );

// userRoutes.post("/email-verified", emailVerifiedController.emailVerifield)
userRoutes.post("/resend-verification", emailVerifiedController.resendVerification)

export default userRoutes;
