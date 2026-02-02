import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface Payload {
	sub: string;
}

export function generateAccessToken(userId: string) {
	return jwt.sign({ sub: userId } satisfies Payload, env.JWT_ACCESS_SECRET, {
		expiresIn: env.JWT_ACCESS_EXPIRES,
	});
}

export function generateRefreshToken(userId: string) {
	return jwt.sign({ sub: userId } satisfies Payload, env.JWT_REFRESH_SECRET, {
		expiresIn: env.JWT_REFRESH_EXPIRES,
	});
}
