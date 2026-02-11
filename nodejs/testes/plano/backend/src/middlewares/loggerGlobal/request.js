import { randomUUID } from "crypto";
import logger from "../../logger/pino.js";

function requestGlobal(req, res, next) {
	const start = Date.now();
	const requestId = randomUUID();

	req.logger = logger.child({
		requestId,
		userId: req.user?.id,
	});

	res.on("finish", () => {
		req.logger.info({
			event: "HTTP_REQUEST",
			method: req.method,
			url: req.originalUrl,
			status: res.statusCode,
			duration: Date.now() - start,
			ip: req.ip,
		});
	});

	next();
}

export default requestGlobal;
