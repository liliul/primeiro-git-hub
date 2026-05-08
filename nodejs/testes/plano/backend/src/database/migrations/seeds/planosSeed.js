import { pool } from "../../postgres.js";

export async function planosSeed() {
	const plans = [
		{
			name: "start",
			price: 0,
		},
		{
			name: "pro",
			price: 29.9,
		},
		{
			name: "master",
			price: 99.9,
		},
	];

	for (const plan of plans) {
		await pool.query(
			`
			INSERT INTO plans (name, price)
			VALUES ($1, $2)
			ON CONFLICT (name) DO NOTHING
			`,
			[plan.name, plan.price]
		);
	}

	console.log("Planos seeds executado");
}