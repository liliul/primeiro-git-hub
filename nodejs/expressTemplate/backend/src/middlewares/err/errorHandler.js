import { ZodError } from "zod";
import { AppError } from "../../errors/appErrors/index.js";

class ErrorGlobal {
	errorHandler(error, req, res, next) {
		if (error instanceof AppError) {
			return res.status(error.statusCode).json({
				message: error.message,
				...(error.details && { errors: error.details }),
			});
		}

		if (error instanceof ZodError) {
			return res.status(400).json({
				message: "Erro de validação",
				errors: error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				})),
			});
		}

		console.error(error);

		return res.status(500).json({
			message: "Erro interno do servidor",
		});
	}
}

export default ErrorGlobal;
