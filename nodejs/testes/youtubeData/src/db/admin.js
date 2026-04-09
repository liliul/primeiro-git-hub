import db from './conection_db.js'

async function adminController() {
  await db.query(`
    UPDATE usuarios SET role = 'admin' WHERE email = 'admin@email.com';
  `);

  console.log('✅ Definir unico usuario admin do sistema.');

  await db.end();
  process.exit();
}

adminController().catch((err) => {
  console.error('Erro ao criar tabela:', err);
  process.exit(1);
});
