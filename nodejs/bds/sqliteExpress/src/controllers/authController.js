const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('../config/database');
const jwtConfig = require('../config/jwt');

// Registro de usuário
exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;
    const db = getDatabase();

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 é o salt rounds

    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        function (err) {
            if (err) {
                if (err.message.includes('SQLITE_CONSTRAINT_UNIQUE')) {
                    return res.status(409).json({ error: "Email já cadastrado." });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Usuário registrado com sucesso.", id: this.lastID });
        }
    );
};

// Login de usuário
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const db = getDatabase();

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Comparar a senha fornecida com a senha hasheada no banco
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Gerar JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload do token
            jwtConfig.secret,                   // Chave secreta
            { expiresIn: jwtConfig.expiresIn }  // Opções (expiração)
        );

        res.json({ message: "Login bem-sucedido!", token: token });
    });
};