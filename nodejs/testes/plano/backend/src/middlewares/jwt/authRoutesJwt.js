import jwt from "jsonwebtoken";
import { constsRole } from "../../consts/index.js";
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

	garantirRole(...rolesPermitidas) {
		return (req, res, next) => {
			const { user } = req;

			if (!user || !user.roles) {
				throw new AppError("Permissão não encontrada", 403);
			}

			const temRole = user.roles.some((role) => rolesPermitidas.includes(role));

			if (!temRole) {
				throw new AppError("Acesso negado", 403);
			}

			return next();
		};
	}

	validarPermissao(...permissaoPermitidas) {
		return (req, res, next) => {
			const { permissions } = req.user;

			if (
				permissions.includes(constsRole.PERMISSIONS_SUPER_ADMIN) ||
				permissions.some((p) => permissaoPermitidas.includes(p))
			) {
				return next();
			}

			throw new AppError("Permissão insuficiente", 403);
		};
	}

	garantirPolitica(politica) {
		return (req, res, next) => {
			const permitir = politica({
				user: req.user,
				resource: req.params,
				body: req.body,
			});

			if (!permitir) {
				throw new AppError("Acesso negado pela política", 403);
			}

			return next();
		};
	}
}

export default AuthRoutesJwt;
