-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLE users (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   name TEXT NOT NULL,
--   email TEXT UNIQUE NOT NULL,
--   password TEXT NOT NULL,
--   roles TEXT DEFAULT 'user',
--   created_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE refresh_tokens (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   token TEXT NOT NULL,
--   expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- INSERT INTO refresh_tokens (user_id, token, expires_at)
-- VALUES (
--   'c99e0957-efe7-4d02-80a9-aae8b159d596',
--   gen_random_uuid(),
--   NOW() - INTERVAL '1 day'
-- );

-- CREATE TABLE auth_audit_logs (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID NULL,
--   email TEXT,
--   action VARCHAR(20) NOT NULL,
--   ip TEXT,
--   user_agent TEXT,
--   created_at TIMESTAMP DEFAULT now()
-- );

-- select * from refresh_tokens;
-- select * from auth_audit_logs;
-- select * from password_resets;	
-- DELETE FROM password_resets;

-- ALTER TABLE auth_audit_logs
-- ADD COLUMN metadata JSONB;

-- SELECT id, token_hash, used, expires_at, created_at
-- FROM password_resets
-- ORDER BY created_at DESC;
-- SELECT token_hash, used
-- FROM password_resets
-- WHERE token_hash = 'c556bbcb7b18626abb08b2b02f60b8d23335d71db995073c7958a7c85b2a5e42';
-- SELECT expires_at, NOW()
-- FROM password_resets
-- WHERE token_hash = 'c556bbcb7b18626abb08b2b02f60b8d23335d71db995073c7958a7c85b2a5e42';

-- SELECT 
--   id,
--   used,
--   expires_at,
--   NOW(),
--   expires_at > NOW() AS valido_tempo,
--   used = false AS valido_used
-- FROM password_resets
-- WHERE token_hash = '01a5062f3946ba80ec8c53f89b795f661c7f840ec3fd22459ae0f508ca2d42ad';

-- ALTER TABLE password_resets
-- ALTER COLUMN expires_at
-- TYPE TIMESTAMPTZ

 -- SELECT *
 --    FROM password_resets
 --    WHERE token_hash = 'c556bbcb7b18626abb08b2b02f60b8d23335d71db995073c7958a7c85b2a5e42'
 --      AND used = true
 --      AND expires_at > NOW()
 --    LIMIT 1

--  SELECT used
-- FROM password_resets
-- WHERE token_hash = 'c556bbcb7b18626abb08b2b02f60b8d23335d71db995073c7958a7c85b2a5e42';

-- SELECT id, token_hash, used, expires_at, created_at
-- FROM password_resets
-- WHERE user_id = '94e265d7-b0e4-4680-8826-7e832ae96b1d'
-- ORDER BY created_at DESC;


-- CREATE TABLE password_resets (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--   token_hash TEXT NOT NULL,
--   expires_at TIMESTAMP NOT NULL,
--   used BOOLEAN DEFAULT FALSE,
--   created_at TIMESTAMP DEFAULT NOW()
-- );
