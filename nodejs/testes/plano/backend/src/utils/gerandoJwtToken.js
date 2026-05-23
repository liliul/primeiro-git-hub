import jwt from "jsonwebtoken";
import { resolvePermissionsJwt } from "./resolvePermissions.js";

class GerandoJwtToken {
	gerarAccessToken({ id, roles, plano }) {
		return jwt.sign(
			{
				roles: roles,
				permissions: resolvePermissionsJwt(roles),
				plano: plano,
			},
			process.env.JWT_SECRET,
			{
				subject: id,
				expiresIn: process.env.JWT_EXPIRES_IN || "15m",
			},
		);
	}
}

export default GerandoJwtToken;
