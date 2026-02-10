import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const publicRateLimit = (rotaLimitada) => {
	return rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		keyGenerator: (req) => {
			const email = req.body?.email ?? "unknown";
			return `${ipKeyGenerator(req)}-${email}`;
		},
		message: {
			error: `Muitas tentativas de ${rotaLimitada}. Tente novamente em 15 minutos.`,
		},
		standardHeaders: true,
		legacyHeaders: false,
	});
};

export const authRateLimit = (rotaLimitada) => {
	return rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		keyGenerator: (req) => {
			if (!req.user?.id) {
				return `user-${req.user.id}`;
			}

			return ipKeyGenerator(req.user.id);
		},
		message: {
			error: `Muitas tentativas de ${rotaLimitada}. Tente novamente em 15 minutos.`,
		},
		standardHeaders: true,
		legacyHeaders: false,
	});
};

export const refreshRateLimit = (rotaLimitada) => {
	return rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		keyGenerator: (req) =>
			`refresh-${req.body.refreshToken || ipKeyGenerator(req.ip)}`,
		message: {
			error: `Muitas tentativas de ${rotaLimitada}. Tente novamente em 15 minutos.`,
		},
		standardHeaders: true,
		legacyHeaders: false,
	});
};
