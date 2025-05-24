// src/config/database.js

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './mydatabase.db'; // Caminho relativo à raiz do projeto

let db;

function connectDatabase() {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('Erro ao abrir o banco de dados:', err.message);
                reject(err);
            } else {
                console.log('Conectado ao banco de dados SQLite.');
                // Cria a tabela 'users' se ela não existir
                db.run(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL
                    )
                `, (createErr) => {
                    if (createErr) {
                        console.error('Erro ao criar tabela users:', createErr.message);
                        reject(createErr);
                    } else {
                        console.log('Tabela "users" verificada/criada.');
                        // Opcional: Inserir alguns dados de exemplo se a tabela estiver vazia
                        db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
                            if (err) {
                                console.error("Erro ao contar usuários:", err.message);
                                reject(err);
                            } else if (row.count === 0) {
                                console.log("Inserindo dados de exemplo...");
                                db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Som Goku", "som#email.com"]);
                                db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Naruto Uzumaki", "uzumaki#email.com"]);
                            }
                            resolve(db); // Resolve a promessa com a instância do DB
                        });
                    }
                });
            }
        });
    });
}

function getDatabase() {
    if (!db) {
        console.error('Banco de dados não está conectado. Chame connectDatabase() primeiro.');
        throw new Error('Database not connected.');
    }
    return db;
}

function closeDatabase() {
    if (db) {
        db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados SQLite fechada.');
            }
        });
    }
}

module.exports = {
    connectDatabase,
    getDatabase,
    closeDatabase
};