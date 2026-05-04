import exepress from "express";
import { constsRateLimit } from "../../../consts/index.js";
import { pool } from "../../../database/postgres.js";
import AuthRoutesJwt from "../../../middlewares/jwt/authRoutesJwt.js";
import { refreshRateLimit } from "../../../middlewares/rateLimit/rateLimit.js";
import AuthRefreshTokenController from "./authRefreshTokenController.js";

const authRefresToken = exepress.Router();

const authRefreshTokenController = new AuthRefreshTokenController(pool);
const JWT = new AuthRoutesJwt();

authRefresToken.post(
	"/refresh",
	JWT.authRefreshToken,
	refreshRateLimit(constsRateLimit.REFRESH_RATELIMIT),
	authRefreshTokenController.refresh,
);
authRefresToken.post(
	"/logout",
	JWT.authRefreshToken,
	refreshRateLimit(constsRateLimit.REFRESH_LOGOUT_RATELIMIT),
	authRefreshTokenController.logout,
);

export default authRefresToken;
