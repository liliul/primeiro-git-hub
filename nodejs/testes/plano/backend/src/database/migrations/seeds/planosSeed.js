import { pool } from "../../postgres.js";
import { planosConfig } from "../../../configs/plans.js";

export async function planosSeed() {
	const plans = planosConfig;

	for (const plan of plans) {
		await pool.query(
			`
			INSERT INTO plans (name, price, duration_days)
			VALUES ($1, $2, $3)
			ON CONFLICT (name) DO NOTHING
			`,
			[plan.name, plan.price, plan.duration_days],
		);
	}

	console.log("Planos seeds executado");
}
