import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appErrors/index.js";

class AuthRoutesJwt {
	auth(req, res, next) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new AppError("Token não informado", 401);
		}

		const [, token] = authHeader.split(" ");

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = {
				id: decoded.sub,
				roles: decoded.roles,
			};

			return next();
		} catch {
			throw new AppError("Token inválido ou expirado", 401);
		}
	}
}

export default AuthRoutesJwt;
