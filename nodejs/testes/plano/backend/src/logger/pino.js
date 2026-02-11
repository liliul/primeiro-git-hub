import pino from "pino";

const logger = pino({
	level: process.env.LOG_LEVEL || "info",
	base: {
		service: "plano",
		env: process.env.NODE_ENV,
	},
	timestamp: pino.stdTimeFunctions.isoTime,
	transport:
		process.env.NODE_ENV !== "production"
			? {
					target: "pino-pretty",
					options: { colorize: true },
				}
			: undefined,
});

export default logger;
