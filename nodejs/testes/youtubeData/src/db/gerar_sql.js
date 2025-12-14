import db from './conection_db.js'

async function createTableYoutubeAlta() {
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE google_oauth_tokens (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        google_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255),
        access_token TEXT NOT NULL,
        refresh_token TEXT,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    );

  `);
  console.log('✅ Tabela youtube_videos criada (ou já existia).');
  process.exit();
}

createTableYoutubeAlta().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});
