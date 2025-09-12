import express from "express";
import sqlite3 from "sqlite3";
import { nanoid } from "nanoid";
import path from "path"

const app = express();
app.use(express.json());

// Conexão direta
const db = new sqlite3.Database(path.resolve("./database.sqlite"));

// Cria tabela
db.run(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Encurtar URL
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL é obrigatória" });

  const shortCode = nanoid(6);

  db.run(
    "INSERT INTO urls (original_url, short_code) VALUES (?, ?)",
    [url, shortCode],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        shortUrl: `http://localhost:3000/${shortCode}`,
        originalUrl: url,
      });
    }
  );
});

// Redirecionar
app.get("/:code", (req, res) => {
  const { code } = req.params;

  db.get("SELECT * FROM urls WHERE short_code = ?", [code], (err, row) => {
    if (!row) return res.status(404).send("Link não encontrado");

    db.run("UPDATE urls SET clicks = clicks + 1 WHERE id = ?", [row.id]);

    res.redirect(row.original_url);
  });
});

// Estatísticas
app.get("/stats/:code", (req, res) => {
  const { code } = req.params;

  db.get("SELECT * FROM urls WHERE short_code = ?", [code], (err, row) => {
    if (!row) return res.status(404).json({ error: "Link não encontrado" });

    res.json({
      originalUrl: row.original_url,
      clicks: row.clicks,
      createdAt: row.created_at,
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
