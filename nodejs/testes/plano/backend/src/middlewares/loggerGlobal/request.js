import logger from "../../logger/pino.js";

function requestGlobal(req, res, next) {
	const start = Date.now();

	res.on("finish", () => {
		logger.info({
			method: req.method,
			url: req.originalUrl,
			status: res.statusCode,
			duration: Date.now() - start,
			ip: req.ip,
			userId: req.user?.id,
		});
	});

	next();
}

export default requestGlobal;
