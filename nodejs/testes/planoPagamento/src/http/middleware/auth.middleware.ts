import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
	sub: string;
}

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Token não informado" });
	}

	const [scheme, token] = authHeader.split(" ");

	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({ message: "Token malformado" });
	}

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET!,
		) as JwtPayload;

		req.userId = payload.sub;

		return next();
	} catch {
		return res.status(401).json({ message: "Token inválido ou expirado" });
	}
}
