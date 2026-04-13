import db from './conection_db.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const {
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_ROLE
} = process.env

async function adminController() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(150) NOT NULL,
      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
      criado_em TIMESTAMP DEFAULT NOW()
    );
  `);

  const hashPassword = await hashed(ADMIN_PASSWORD, 10)

  await db.query(`
    INSERT INTO usuarios (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        password = EXCLUDED.password,
        role = EXCLUDED.role`,
      [ADMIN_NAME, ADMIN_EMAIL, hashPassword, ADMIN_ROLE] 
  );


  console.log('✅ Definir usuario admin do sistema.');

  await db.end();
  process.exit();
}

adminController().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});

async function hashed(password, rounts = 10) {
  return await bcrypt.hash(password, rounts);
}