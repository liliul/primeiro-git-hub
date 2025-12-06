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
