import { constsRateLimit, constsRole } from "#consts";
import express from "express";
import { pool } from "../../../../database/postgres.js";
import AuthRoutesJwt from "../../../../middlewares/jwt/authRoutesJwt.js";
import Policies from "../../../../middlewares/jwt/policies.js";
import { authRateLimit } from "../../../../middlewares/rateLimit/rateLimit.js";
import SuperAdminController from "../controller/superAdminController.js";

const superAdminRoutes = express.Router();
const JWT = new AuthRoutesJwt();
const policies = new Policies();

const superAdminController = new SuperAdminController(pool);

superAdminRoutes.get(
	"/roles/:id",
	JWT.auth,
	authRateLimit(constsRateLimit.SUPERADMIN_NEWROLE_RATELIMIT),
	JWT.garantirRole(constsRole.ROLES_SUPERADMIN),
	JWT.validarPermissao(constsRole.PERMISSIONS_SUPER_ADMIN),
	JWT.garantirPolitica(policies.alterarRole),
	superAdminController.alterarRole.bind(superAdminController),
);
export default superAdminRoutes;
