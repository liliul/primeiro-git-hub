CREATE TABLE google_users (
    -- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

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

