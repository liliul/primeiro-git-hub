CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL, 
  price NUMERIC
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  plan_id UUID REFERENCES plans(id),
  status TEXT DEFAULT 'active', 
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);