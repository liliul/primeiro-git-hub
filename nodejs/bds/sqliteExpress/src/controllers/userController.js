// src/controllers/userController.js

const { getDatabase } = require('../config/database');

// Obter todos os usuários
exports.getAllUsers = (req, res) => {
    const db = getDatabase();
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
};

// Obter um usuário por ID
exports.getUserById = (req, res) => {
    const db = getDatabase();
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
};

// Adicionar um novo usuário
// exports.createUser = (req, res) => {
//     const db = getDatabase();
//     const { name, email } = req.body;
//     if (!name || !email) {
//         res.status(400).json({ error: "Nome e email são obrigatórios." });
//         return;
//     }

//     db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
//         if (err) {
//             if (err.message.includes('SQLITE_CONSTRAINT_UNIQUE')) {
//                 res.status(409).json({ error: "Email já cadastrado." });
//             } else {
//                 res.status(500).json({ error: err.message });
//             }
//             return;
//         }
//         res.status(201).json({ message: "Usuário adicionado com sucesso.", id: this.lastID });
//     });
// };

// Atualizar um usuário
exports.updateUser = (req, res) => {
    const db = getDatabase();
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
    updateValues.push(id);

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
};

// Deletar um usuário
exports.deleteUser = (req, res) => {
    const db = getDatabase();
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
};