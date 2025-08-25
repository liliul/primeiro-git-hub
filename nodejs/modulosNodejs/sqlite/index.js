const sqlite3 = require('sqlite3').verbose();
console.log(sqlite3.VERSION);


//Conecta ao banco de dados (se não existir, será criado)
const db = new sqlite3.Database('person.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite!');
  }
});

db.serialize(() => {
  // Cria a tabela 'usuarios'
  db.run("CREATE TABLE IF NOT EXISTS jounins (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, vila TEXT)");

  console.log('Tabela "jounins" criada ou já existente!');
});

// db.close();

// const nome = 'itachi';
// const vila = 'konoha';
// db.serialize(() => {
//   // Inserindo dados na tabela
//   const stmt = db.prepare("INSERT INTO jounins (nome, vila) VALUES (?, ?)");
//   stmt.run(nome, vila, function(err) {
//     if (err) {
//       console.error('Erro ao inserir dados:', err.message);
//     } else {
//       console.log(`Usuário inserido com sucesso! ID: ${this.lastID}`);
//     }
//   });
  
//   stmt.finalize();
// });

// db.close();

// const id = 4;
// const nome = 'kisame'
// const vila = "nevou";
// db.serialize(() => {
//   const stmt = db.prepare("UPDATE jounins SET nome = ?, vila = ? WHERE id = ?");
//   stmt.run(nome, vila, id, function(err) {
//     if (err) {
//       console.error('Erro ao atualizar dados:', err.message);
//     } else {
//       console.log(`Usuário com ID ${id} atualizado. Linhas afetadas: ${this.changes}`);
//     }
//   });
  
//   stmt.finalize();
// });

// db.close();

// const id = 2;
// db.serialize(() => {
//   const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
//   stmt.run(id, function(err) {
//     if (err) {
//       console.error('Erro ao excluir dados:', err.message);
//     } else {
//       console.log(`Usuário com ID ${id} excluído. Linhas afetadas: ${this.changes}`);
//     }
//   });

//   stmt.finalize();
// });

// db.close();

db.serialize(() => {
  // Consultando todos os usuários
  db.each("SELECT id, nome, vila FROM jounins", (err, row) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      console.log(`ID: ${row.id}, Nome: ${row.nome}, Idade: ${row.vila}`);
    }
  });
});

// // db.close();

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados fechada com sucesso.');
  }
});


// Sqlite com async await

// const sqlite = require('sqlite');
// // const sqlite3 = require('sqlite3');

// async function main() {
//   const db = await sqlite.open({ filename: 'async_await.db', driver: sqlite3.Database });

//   // Cria a tabela
//   await db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, idade INTEGER)");

//   // Insere um usuário
//   await db.run("INSERT INTO usuarios (nome, idade) VALUES (?, ?)", ['Maria', 30]);

//   // Consulta os dados
//   const usuarios = await db.all("SELECT * FROM usuarios");
//   console.log(usuarios);

//   // Fecha a conexão
//   await db.close();
// }

// main().catch(console.error);
