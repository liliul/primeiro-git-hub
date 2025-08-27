const sqlite3 = require('sqlite3').verbose();
const path = require('path')


const db = new sqlite3.Database(path.join(__dirname, '../../db/person.db'), (err) => {
    if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
    console.log('Conectado ao banco de dados SQLite!');
    }
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS account (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sobrenome TEXT, senha TEXT, pais TEXT)");

    console.log('Tabela "account" criada ou já existente!');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, anime TEXT)");

    console.log('Tabela "person" criada ou já existente!');
});

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS anime (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_anime TEXT, pais_origem TEXT)");

    console.log('Tabela "anime" criada ou já existente!');
});

module.exports = db