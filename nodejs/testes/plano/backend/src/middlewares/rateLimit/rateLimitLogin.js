import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const loginRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	keyGenerator: (req) => {
		const email = req.body?.email ?? "unknown";
		return `${ipKeyGenerator(req)}-${email}`;
	},
	message: {
		error: "Muitas tentativas de login. Tente novamente em 15 minutos.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
