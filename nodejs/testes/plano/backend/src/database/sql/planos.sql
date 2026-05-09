CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL, 
  price NUMERIC,
  duration_days INTEGER
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES plans(id),
  status TEXT DEFAULT 'active', 
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

UPDATE subscriptions
SET status = 'expired'
WHERE expires_at < NOW();

SELECT 
  s.*,
  p.name AS plan_name
FROM subscriptions s
JOIN plans p ON p.id = s.plan_id
WHERE s.user_id = '5bc5713d-9a47-4652-98b4-578afa96b36f'
  AND s.status = 'active'
  AND (
    s.expires_at IS NULL
    OR s.expires_at > NOW()
  )
ORDER BY s.created_at DESC
LIMIT 1;