import { pool } from "../../postgres.js";

export async function planosSeed() {
	const plans = [
		{
			name: "start",
			price: 0,
			duration_days: null,
		},
		{
			name: "pro",
			price: 29.9,
			duration_days: 30,
		},
		{
			name: "master",
			price: 99.9,
			duration_days: 365,
		},
	];

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
