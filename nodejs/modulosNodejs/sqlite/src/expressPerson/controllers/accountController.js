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
        const { nome, senha } = req.body

        if (!nome || !senha) return res.status(400).json({ message: 'Erro usuário e senha obrigatórios' });

        this.db.get('SELECT * FROM account WHERE nome = ? ', [nome], (err, user) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
            }

            if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
            }

            bcrypt.compare(senha, user.senha, (err, results) => {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao comparar senha'})
                }
                if (!results) {
                    return res.status(401).json({ message: 'Erro na senha'})
                }

                
                const payload = { userId: user.id, username: user.nome };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.JWT_EXPIRES)
                });

                res.json({ token })
            })
        })
        
    }

    clientes(req, res) {
        const results = []
        this.db.serialize(() => {
            this.db.each("SELECT id, nome, sobrenome, pais FROM account", (err, user) => {
                if (err) {
                    res.status(401).json({message: 'Erro ao consultar dados:', erro: err.message})
                } 

                results.push(user);
            });

            this.db.get("SELECT COUNT(*) as count FROM account", (err, countUser) => {
                if (err) {
                    return res.status(401).json({ message: 'Erro ao contar dados:', erro: err.message });
                }

                res.status(200).json({ message: 'Busca de registro', data: results, total: countUser.count });
            });
        }) 
    }

    naruto(req, res) { 
        console.log("Retornou todos de naruto a vila!");
        res.json([{id:2,nome:'naruto uzumaki'}]);
    }
}
module.exports = AccountController