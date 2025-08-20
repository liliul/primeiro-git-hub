const mysql = require('mysql2'); 

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sua_base_de_dados',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); 
  }
  console.log('Conexão com o banco de dados MySQL estabelecida!');
});

module.exports = db;
