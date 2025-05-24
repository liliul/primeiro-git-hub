// app.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // .verbose() para logs mais detalhados
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// --- Configuração do Banco de Dados SQLite ---
// Conecta ao banco de dados ou cria um novo se não existir
// O arquivo 'mydatabase.db' será criado no mesmo diretório
const DB_PATH = './mydatabase.db';
let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');

        // Cria a tabela 'users' se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`, (createErr) => {
            if (createErr) {
                console.error('Erro ao criar tabela users:', createErr.message);
            } else {
                console.log('Tabela "users" verificada/criada.');
                // Opcional: Inserir alguns dados de exemplo se a tabela estiver vazia
                db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
                    if (err) {
                        console.error("Erro ao contar usuários:", err.message);
                    } else if (row.count === 0) {
                        console.log("Inserindo dados de exemplo...");
                        db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Alice", "alice@example.com"]);
                        db.run("INSERT INTO users (name, email) VALUES (?, ?)", ["Bob", "bob@example.com"]);
                    }
                });
            }
        });
    }
});

// --- Rotas da API ---

// 1. Obter todos os usuários (GET)
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// 2. Obter um usuário por ID (GET)
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.json({ data: row });
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        }
    });
});

// 3. Adicionar um novo usuário (POST)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        res.status(400).json({ error: "Nome e email são obrigatórios." });
        return;
    }

    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
        if (err) {
            // Erro de UNIQUE constraint para email, por exemplo
            if (err.message.includes('SQLITE_CONSTRAINT_UNIQUE')) {
                res.status(409).json({ error: "Email já cadastrado." });
            } else {
                res.status(500).json({ error: err.message });
            }
            return;
        }
        // Retorna o ID do novo usuário (this.lastID)
        res.status(201).json({ message: "Usuário adicionado com sucesso.", id: this.lastID });
    });
});

// 4. Atualizar um usuário (PUT)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name && !email) {
        res.status(400).json({ error: "Pelo menos 'name' ou 'email' deve ser fornecido para atualização." });
        return;
    }

    let updateFields = [];
    let updateValues = [];
    if (name) {
        updateFields.push("name = ?");
        updateValues.push(name);
    }
    if (email) {
        updateFields.push("email = ?");
        updateValues.push(email);
    }

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    updateValues.push(id); // Adiciona o ID no final para a cláusula WHERE

    db.run(query, updateValues, function (err) {
        if (err) {
            if (err.message.includes('SQLITE_CONSTRAINT_UNIQUE')) {
                res.status(409).json({ error: "Email já cadastrado para outro usuário." });
            } else {
                res.status(500).json({ error: err.message });
            }
            return;
        }
        if (this.changes > 0) {
            res.json({ message: "Usuário atualizado com sucesso." });
        } else {
            res.status(404).json({ message: "Usuário não encontrado para atualização." });
        }
    });
});

// 5. Deletar um usuário (DELETE)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM users WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes > 0) {
            res.json({ message: "Usuário deletado com sucesso." });
        } else {
            res.status(404).json({ message: "Usuário não encontrado para exclusão." });
        }
    });
});


// --- Inicialização do Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// --- Lidar com o encerramento da aplicação para fechar o banco de dados ---
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Conexão com o banco de dados SQLite fechada.');
        }
        process.exit(0); // Encerra o processo Node.js
    });
}); 