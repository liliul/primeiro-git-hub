import express from "express";
import { pool } from "../../database/postgres.js";
import { AppError } from "../../errors/appErrors/index.js";
import AuthRoutesJwt from "../../middlewares/jwt/authRoutesJwt.js";

const planoRouter = express.Router();
const JWT = new AuthRoutesJwt();

planoRouter.post("/create", JWT.auth, async (req, res) => {
	const { planName } = req.body;
	const { id } = req.user;
	console.log(req.user);

	const plano = await pool.query(
		`
		SELECT * FROM plans
		WHERE name = $1
		LIMIT 1
		`,
		[planName],
	);

	if (!plano.rows[0]) {
		throw new AppError("plano não encontrado", 404);
	}
	console.log("plano", plano.rows[0]);

	let expiresAt = null;

	if (plano.rows[0].duration_days) {
		expiresAt = new Date(
			Date.now() + plano.rows[0].duration_days * 24 * 60 * 60 * 1000,
		);
	}

	await pool.query(
		`
		UPDATE subscriptions
		SET status = 'inactive'
		WHERE user_id = $1
		AND status = 'active'
		`,
		[id],
	);

	const assinatura = await pool.query(
		`
		INSERT INTO subscriptions (
			user_id,
			plan_id,
			status,
			expires_at
		)
		VALUES ($1, $2, $3, $4)
		RETURNING *
		`,
		[id, plano.rows[0].id, "active", expiresAt],
	);

	if (!assinatura.rows[0]) {
		throw new AppError("Assinatura ativa não encontrada", 404);
	}

	return res.status(201).json({ assinatura: assinatura.rows[0], planName });
});

export default planoRouter;
