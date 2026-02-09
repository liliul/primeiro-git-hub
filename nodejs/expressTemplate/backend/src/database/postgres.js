import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
	console.log("Conectado ao PostgreSQL");
});
