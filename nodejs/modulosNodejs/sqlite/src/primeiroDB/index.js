const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const db = new sqlite3.Database(path.join(__dirname, '../../db/animes.db'), (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite!');
  }
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS animes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, pais TEXT)");

  console.log('Tabela "animes" criada ou já existente!');
});

// const nome = 'Dragon Ball Super';
// const pais = 'JP';
// db.serialize(() => {
//   // Inserindo dados na tabela
//   const stmt = db.prepare("INSERT INTO animes (nome, pais) VALUES (?, ?)");
//   stmt.run(nome, pais, function(err) {
//     if (err) {
//       console.error('Erro ao inserir dados:', err.message);
//     } else {
//       console.log(`Usuário inserido com sucesso! ID: ${this.lastID}`);
//     }
//   });
  
//   stmt.finalize();
// });

// const id = 11;
// const nome = 'Digimon'
// const pais = "JP";
// db.serialize(() => {
//   const stmt = db.prepare("UPDATE animes SET nome = ?, pais = ? WHERE id = ?");
//   stmt.run(nome, pais, id, function(err) {
//     if (err) {
//       console.error('Erro ao atualizar dados:', err.message);
//     } else {
//       console.log(`Usuário com ID ${id} atualizado. Linhas afetadas: ${this.changes}`);
//     }
//   });
  
//   stmt.finalize();
// });

// const id = 12;
// db.serialize(() => {
//   const stmt = db.prepare("DELETE FROM animes WHERE id = ?");
//   stmt.run(id, function(err) {
//     if (err) {
//       console.error('Erro ao excluir dados:', err.message);
//     } else {
//       console.log(`Usuário com ID ${id} excluído. Linhas afetadas: ${this.changes}`);
//     }
//   });

//   stmt.finalize();
// });

db.serialize(() => {
  db.each("SELECT id, nome, pais FROM animes", (err, row) => {
    if (err) {
      console.error('Erro ao consultar dados:', err.message);
    } else {
      console.log(`ID: ${row.id}, Nome: ${row.nome}, Pais: ${row.pais}`);
    }
  });
});

db.close((err) => {
  if (err) {
    console.error('Erro ao fechar o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados fechada com sucesso.');
  }
});