import db from './conection_db.js'

async function createTesteUUID() {
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
    CREATE TABLE teste_uuid (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        video_id TEXT NOT NULL,
        title TEXT,
        description TEXT,
        channel TEXT,
        published_at TIMESTAMP,
        thumbnails JSONB,
        tags TEXT[],
        statistics JSONB,
        video_url TEXT,
        etag TEXT,
        channel_id TEXT,
        region_code TEXT,
        criado_em TIMESTAMP DEFAULT NOW()
    );
  `);
  
  console.log('✅ Tabela testeuuid criada (ou já existia).');

  await db.query(`
    INSERT INTO teste_uuid (video_id, title, description, channel, region_code)
    VALUES ('abc123', 'Título de Teste', 'Descrição teste', 'Canal X', 'JP')
    RETURNING id, criado_em;

  `)

  process.exit();
}

createTesteUUID().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});
