import db from './conection_db.js'

async function createTableYoutubeAlta() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS youtube_videos (
      id SERIAL PRIMARY KEY,
      video_id VARCHAR(30) UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      channel VARCHAR(100),
      published_at TIMESTAMP,
      thumbnails JSONB,
      tags TEXT[],
      statistics JSONB,
      video_url TEXT,
      etag TEXT,
      channel_id VARCHAR(50),
      region_code VARCHAR(5),
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✅ Tabela youtube_videos criada (ou já existia).');
  process.exit();
}

createTableYoutubeAlta().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});
