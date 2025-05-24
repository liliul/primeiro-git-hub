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
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL 
                    )
                `, (createErr) => {
                    if (createErr) {
                        console.error('Erro ao criar tabela users:', createErr.message);
                        reject(createErr);
                    } else {
                        console.log('Tabela "users" verificada/criada.');
                        // Opcional: Inserir alguns dados de exemplo se a tabela estiver vazia
                        // src/config/database.js (trecho da função connectDatabase)

// ...
                        db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
                            if (err) {
                                console.error("Erro ao contar usuários:", err.message);
                                reject(err);
                            } else if (row.count === 0) {
                                console.log("Inserindo dados de exemplo...");
                                const bcrypt = require('bcryptjs'); // Certifique-se que esta linha está aqui!
                                const hashedPassword1 = bcrypt.hashSync("password123", 10);
                                const hashedPassword2 = bcrypt.hashSync("securepass", 10);

                                // Adicionando logs para verificar os hashes
                                console.log("hashedPassword1:", hashedPassword1);
                                console.log("hashedPassword2:", hashedPassword2);

                                // LINHAS CORRIGIDAS E COM CALLBACKS PARA MELHOR DEBUGGING:
                                db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                                    ["Som Goku", "som@email.com", hashedPassword1],
                                    function(err) { // Adicione um callback para este db.run
                                        if (err) {
                                            console.error("Erro ao inserir 'Som Goku':", err.message);
                                            // Se este erro for crítico para a inicialização, você pode rejeitar a promessa aqui
                                            // reject(err);
                                        } else {
                                            console.log("'Som Goku' inserido com sucesso. ID:", this.lastID);
                                        }
                                    }
                                );

                                db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                                    ["Naruto Uzumaki", "uzumaki@email.com", hashedPassword2],
                                    function(err) { // Adicione um callback para este db.run
                                        if (err) {
                                            console.error("Erro ao inserir 'Naruto Uzumaki':", err.message);
                                            // reject(err);
                                        } else {
                                            console.log("'Naruto Uzumaki' inserido com sucesso. ID:", this.lastID);
                                        }
                                    }
                                );
                            }
                            resolve(db); // Resolve a promessa. Note: Este resolve é chamado antes das inserções `db.run` finalizarem
                                        // se elas tiverem um callback. Para uma inicialização mais rigorosa,
                                        // você poderia esperar por todas as inserções completarem (usando Promise.all se fossem Promises,
                                        // ou callbacks encadeados). Mas para este problema, a depuração com o callback já é suficiente.
                        });
// ...
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