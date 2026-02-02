import { Router } from "express";
import { pool } from "../database";

export const healthRoutes = Router();

healthRoutes.get("/", async (_req, res) => {
	const result = await pool.query("SELECT 1 + 1 AS result");

	res.json({
		status: "ok",
		db: result.rows[0].result,
	});
});
