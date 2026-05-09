import jwt from "jsonwebtoken";
import { constsRole } from "../../consts/index.js";
import { AppError } from "../../errors/appErrors/index.js";

class AuthRoutesJwt {
	constructor() {
		this.planoHierarquia = {
			start: 1,
			pro: 2,
			master: 3,
		};
	}

	auth(req, res, next) {
		// const authHeader = req.headers.authorization;
		const authHeader = req.cookies.accessToken || req.headers.authorization;

		if (!authHeader) {
			throw new AppError("Token não informado", 401);
		}

		const [, token] = authHeader.split(" ");

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("decoded ", decoded);

			req.user = {
				id: decoded.sub,
				roles: Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles],
				permissions: decoded.permissions || [],
				plano: decoded.plano,
			};

			return next();
		} catch {
			throw new AppError("Token inválido ou expirado", 401);
		}
	}

	authRefreshToken(req, res, next) {
		const token = req.body.refreshToken;

		if (!token) {
			throw new AppError("Refresh token ausente", 401);
		}

		req.refreshToken = token;

		return next();
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
			const permissaoSuperAdmin = permissions.includes(
				constsRole.PERMISSIONS_SUPER_ADMIN,
			);
			const permissaoPermitida = permissions.some((p) =>
				permissaoPermitidas.includes(p),
			);

			if (permissaoSuperAdmin || permissaoPermitida) {
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

	garantirPlano(minPlano) {
		return (req, res, next) => {
			const userPlano = req.user.plan || "start";

			if (this.planoHierarquia[userPlano] < this.planoHierarquia[minPlano]) {
				return res.status(403).json({ message: "Plano insuficiente" });
			}

			next();
		};
	}
}

export default AuthRoutesJwt;
