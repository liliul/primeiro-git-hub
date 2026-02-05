import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
	console.log("Conectado ao PostgreSQL");
});
