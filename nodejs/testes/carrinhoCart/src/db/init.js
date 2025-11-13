import db from './indexDB.js'

async function criarTabelas() {
    await db.query(`

      CREATE EXTENSION IF NOT EXISTS "pgcrypto";

      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        role TEXT DEFAULT 'user'
      );

       CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        stock INT NOT NULL
      );

        CREATE TABLE carts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        total NUMERIC(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE cart_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cart_id UUID REFERENCES carts(id),
        product_id UUID REFERENCES products(id),
        quantity INT NOT NULL,
        UNIQUE(cart_id, product_id)
      );
    `)

    console.log('✅ Tabela criada (ou já existia).')
    process.exit()
}

criarTabelas().then(() => {
    console.log('✅ Tabela criada (ou já existia).')
    process.exit()
})
.catch((err) => {
    console.error('erro ao criar tabelas: ', err);
    process.exit(1)
})

/**

ALTER TABLE users
ADD COLUMN role TEXT DEFAULT 'user';

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user'
);

 CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES carts(id),
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  UNIQUE(cart_id, product_id)
);

CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INT NOT NULL
);
 */
