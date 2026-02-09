import exepress from "express";
import { pool } from "../../../database/postgres.js";
import AuthRefreshTokenController from "./authRefreshTokenController.js";

const authRefresToken = exepress.Router();

const authRefreshTokenController = new AuthRefreshTokenController(pool);

authRefresToken.post(
	"/refresh",
	authRefreshTokenController.refresh.bind(authRefreshTokenController),
);
authRefresToken.post(
	"/logout",
	authRefreshTokenController.logout.bind(authRefreshTokenController),
);

export default authRefresToken;
