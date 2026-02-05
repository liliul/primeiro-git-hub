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
				roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles],
				permissions: decoded.permissions || [],
			};

			return next();
		} catch {
			throw new AppError("Token inválido ou expirado", 401);
		}
	}

	ensureRole(...allowedRoles) {
		return (req, res, next) => {
			const { user } = req;

			if (!user || !user.roles) {
				throw new AppError("Permissão não encontrada", 403);
			}

			const hasRole = user.roles.some((role) => allowedRoles.includes(role));

			if (!hasRole) {
				throw new AppError("Acesso negado", 403);
			}

			return next();
		};
	}

	ensurePermission(...allowedPermissions) {
		return (req, res, next) => {
			const { permissions } = req.user;

			if (
				permissions.includes("*") ||
				permissions.some((p) => allowedPermissions.includes(p))
			) {
				return next();
			}

			throw new AppError("Permissão insuficiente", 403);
		};
	}

	ensurePolicy(policy) {
		return (req, res, next) => {
			const allowed = policy({
				user: req.user,
				resource: req.params,
				body: req.body,
			});

			if (!allowed) {
				throw new AppError("Acesso negado pela política", 403);
			}

			return next();
		};
	}
}

export default AuthRoutesJwt;
