import fs from "fs";
import path from "path";
import db from "./db.js";

const migrationsDir = path.resolve("migrations");

async function runMigrations() {
  // garante que existe a tabela migrations
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      run_on TIMESTAMP DEFAULT NOW()
    );
  `);

  // pega migrations já rodadas
  const res = await db.query("SELECT name FROM migrations");
  const applied = res.rows.map(r => r.name);

  // pega todas as migrations do diretório
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith(".sql"));

  for (const file of files) {
    if (!applied.includes(file)) {
      console.log(`🚀 Rodando migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      try {
        await db.query("BEGIN");
        await db.query(sql);
        await db.query("INSERT INTO migrations (name) VALUES ($1)", [file]);
        await db.query("COMMIT");
        console.log(`✅ Migration aplicada: ${file}`);
      } catch (err) {
        await db.query("ROLLBACK");
        console.error(`❌ Erro na migration ${file}:`, err);
        process.exit(1);
      }
    }
  }

  console.log("🎉 Todas migrations aplicadas!");
  process.exit(0);
}

runMigrations();
