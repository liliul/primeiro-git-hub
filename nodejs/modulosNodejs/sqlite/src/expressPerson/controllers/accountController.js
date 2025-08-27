require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

class AccountController {
    constructor(db) {
        this.db = db
    }

    async registro(req, res) {
        const { nome, sobrenome, senha, pais } = req.body
        
        if (!nome || !senha) {
            return res.status(401).json({ message: 'Erro com senha ou nome de usuario'})
        }
        if (!sobrenome || !pais) {
            return res.status(401).json({ message: 'Erro com sobrenome ou pais'})
        }
        if (senha.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10)
      
        this.db.serialize(() => {
            const stmt = this.db.prepare("INSERT INTO account (nome, sobrenome, senha, pais) VALUES (?, ?, ?, ?)");
            stmt.run(nome, sobrenome, senhaHash, pais, function(err) {
                if (err) {
                    res.status(401).json({ message: 'Erro ao inserir dados:', erro: err.message});
                } else {
                    res.status(200).json({message: `Usuário inserido com sucesso! ID: ${this.lastID}`});
                }
            });

            stmt.finalize();
        });   
    }

    login(req, res) {
        const { username, password} = req.body

         if (!username || !password)
            return res.status(400).json({ message: 'Usuário e senha obrigatórios' });

        const mockUser = { id: 1, username: 'liliul', password: '123' };
        
       if (username !== mockUser.username || password !== mockUser.password)
            return res.status(401).json({ message: 'Credenciais inválidas' });

        const payload = { userId: mockUser.id, username: mockUser.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_EXPIRES)
        });
        res.json({ token })
    }

    clientes(req, res) { 
        console.log("Retornou todos clientes!");
        res.json([{id:1,nome:'liliul github'}]);
    }

    naruto(req, res) { 
        console.log("Retornou todos de naruto a vila!");
        res.json([{id:2,nome:'naruto uzumaki'}]);
    }
}
module.exports = AccountController