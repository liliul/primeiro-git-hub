import { pool } from "./db";

async function gerandoQuerySql() {
  await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            refresh_token TEXT
        );

        ALTER TABLE users
        ADD COLUMN IF NOT EXISTS roles VARCHAR(15) NOT NULL DEFAULT 'user';
    `);

  console.log("Query criada como sucesso.");
  await pool.end();
  process.exit();
}

gerandoQuerySql().catch((e) => {
  console.log("error: ", e);
  process.exit(1);
});
