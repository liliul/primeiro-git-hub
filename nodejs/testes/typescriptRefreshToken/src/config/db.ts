import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const testConnection = async () => {
  try {
    const client = await pool.connect(); 
    console.log("✅ Conectado ao PostgreSQL com sucesso!");
    client.release(); 
  } catch (err) {
    console.error("❌ Erro ao conectar ao PostgreSQL:", err);
  }
};

testConnection();