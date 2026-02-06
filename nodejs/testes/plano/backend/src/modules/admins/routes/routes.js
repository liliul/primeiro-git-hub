import express from "express";
import { pool } from "../../../database/postgres.js";
import AuthRoutesJwt from "../../../middlewares/jwt/authRoutesJwt.js";
import Policies from "../../../middlewares/jwt/policies.js";
import SuperAdminController from "../controller/superAdminController.js";

const adminsRoutes = express.Router();
const JWT = new AuthRoutesJwt();
const policies = new Policies();

const superAdminController = new SuperAdminController(pool);

adminsRoutes.get(
	"/roles/:id",
	JWT.auth,
	JWT.ensureRole("superadmin"),
	JWT.ensurePermission("*"),
	JWT.ensurePolicy(policies.alterarRoles),
	superAdminController.alterarRoles.bind(superAdminController),
);
export default adminsRoutes;
