import db from './conection_db.js'

async function createTableYoutubeAlta() {
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE google_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

        sub TEXT UNIQUE NOT NULL,                 
        email TEXT UNIQUE NOT NULL,
        email_verified BOOLEAN NOT NULL,

        name TEXT,
        given_name TEXT,
        family_name TEXT,
        picture TEXT,

        iss TEXT,
        azp TEXT,
        aud TEXT,
        at_hash TEXT,

        iat BIGINT,  
        exp BIGINT, 

        created_at TIMESTAMP DEFAULT NOW()
    );

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

    CREATE TYPE user_role AS ENUM ('user', 'admin');

    CREATE TABLE IF NOT EXISTS usuarios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(150) NOT NULL,
        role user_role DEFAULT 'user',
        criado_em TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS youtube_videos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  console.log('✅ Tabela criadas (ou já existia).');

  await db.end();
  process.exit();
}

createTableYoutubeAlta().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});
