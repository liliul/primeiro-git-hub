require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { z } = require('zod')
const logger = require("../logger/logger")

const registroSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    sobrenome: z.string().min(3, 'Sobrenome deve ter pelo menos 3 caracteres'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    pais: z.string().min(3, 'Pais deve ter pelo menos 3 caracteres')
});
class AccountController {
    constructor(db) {
        this.db = db
    }

    async registro(req, res) {
        try {
            const { nome, sobrenome, senha, pais } = registroSchema.parse(req.body)
        
        const role = 'user'

        // if (!nome || !senha) {
        //     return res.status(401).json({ message: 'Erro com senha ou nome de usuario'})
        // }
        // if (!sobrenome || !pais) {
        //     return res.status(401).json({ message: 'Erro com sobrenome ou pais'})
        // }
        // if (senha.length < 6) {
        //     return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
        // }

        const senhaHash = await bcrypt.hash(senha, 10)
      
        this.db.serialize(() => {
            const stmt = this.db.prepare("INSERT INTO account (nome, sobrenome, senha, pais, role) VALUES (?, ?, ?, ?, ?)");
            stmt.run(nome, sobrenome, senhaHash, pais, role, function(err) {
                if (err) {
                    res.status(401).json({ message: 'Erro ao inserir dados:', erro: err.message});
                } else {
                    res.status(200).json({message: `Usuário inserido com sucesso! ID: ${this.lastID}`});
                }
            });

            stmt.finalize();
        });   
        } catch (error) {
            if (error instanceof z.ZodError) {
            // Se o erro for de validação, retorna o erro com as mensagens do Zod
            return res.status(400).json({
                message: 'Erro de validação',
                errors: error.errors,
            });
        }

        // Para outros erros, retorna um erro genérico
        return res.status(500).json({ message: 'Erro interno do servidor' })
        }
    }

    login(req, res) {
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({ message: 'Erro usuário e senha obrigatórios' });
        }
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
                    logger.error(`LOGS erro ao comparar senha: ${senha}`)
                    return res.status(401).json({ message: 'Erro na senha'})
                }

                
                const payload = { userId: user.id, username: user.nome, role: user.role };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.JWT_EXPIRES)
                });

                logger.info(`LOGS login success! ${user.nome}`)
                res.json({ token })
            })
        })
        
    }

    clientes(req, res) {
        const results = []
        this.db.serialize(() => {
            this.db.each("SELECT id, nome, sobrenome, pais, role FROM account", (err, user) => {
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
    clientesID(req, res) {
        const { id } = req.params

        const usuario = req.user?.username || 'desconhecido'
        const roles = req.user?.role || 'role-desconhecido'

        this.db.get("SELECT nome, sobrenome, pais, role  FROM account WHERE id = ?", [id], (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Erro ao contar dados:', erro: err.message });
            }
            if (!user) {
                return res.status(404).json({ message: `Nenhum registro encontrado com ID ${id}` });
            }

            logger.info(`[GET] usuario ${usuario} - ${roles} acaba de fazer uma busca pelo ${id} clientesID`)
            res.status(200).json({ message: 'Busca de registro', data: user });
        }); 
    }

    addRoles(req, res) {
        const { id } = req.params 
        const { role } = req.body

        const usuario = req.user?.username || 'desconhecido'
        const roles = req.user?.role || 'role-desconhecido'
        console.error(usuario, roles);
        

        if (!role) {
            return res.status(400).json({ message: 'Role é obrigatória' })
        }

        const rolesPermitidas = ['user', 'admin']
        if (!rolesPermitidas.includes(role)) {
            return res.status(400).json({ message: 'Role inválida' })
        }
        if (req.user.role === 'master' && parseInt(req.user.id) === parseInt(id)) {
            return res.status(403).json({ message: 'O administrador mestre não pode alterar o próprio papel.' });
        }

        logger.info(`LOGS auterando roles ${role}`)

        this.db.get('SELECT role FROM account WHERE id = ?', [id], (err, user) => {
            if (err) {
                logger.error(`[SELECT] erro ao buscar usuario: ${id}`)
                return res.status(500).json({ message: 'Erro ao buscar usuário', erro: err.message })
            }

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' })
            }

            if (user.role === 'master') {
                return res.status(403).json({ message: 'Você não tem permissão para alterar o papel de um administrador mestre' })
            }

            this.db.run('UPDATE account SET role = ? WHERE id = ?', [role, id], function (err, user) {
                if (err) {
                    return res.status(500).json({ message: 'Erro ao atualizar role', erro: err })
                }

                if (this.changes === 0) {
                    return res.status(404).json({ message: 'Usuário não encontrado' })
                }
                
                logger.warn(`[PUT] Usuário ${usuario} - ${roles} atualizou role do usuario  ID ${id} - IP: ${req.ip}`);

                return res.status(200).json({ message: `Role '${role}' atribuída ao usuário com ID ${id}` })
                }
            )
        })   
    }

    deleteRegistro(req, res) {
        const { id } = req.params
        const usuarioExcluindo = req.user?.username || 'desconhecido'
        const roleExcluindo = req.user?.role || 'role-desconhecido'
        
        this.db.serialize(() => {
            const stmt = this.db.prepare('DELETE FROM account WHERE id = ?')
            stmt.run(id, (err) => {
                 if (err) {
                    logger.error(`[DELETE][ERRO] Usuário ${usuarioExcluindo} role ${roleExcluindo} tentou excluir ID ${id} - IP: ${req.ip} - Erro: ${err.message}`)
                    return res.status(401).json({ message: 'Erro ao deleta registro', erro: err.message })
                } else {
                    logger.warn(`[DELETE] Usuário ${usuarioExcluindo} role ${roleExcluindo} excluiu ID ${id} - IP: ${req.ip}`);
                    res.status(200).json({ message: `ID ${id} excluido.`, row: this.changes })
                }
            })

            stmt.finalize()
        })
    }
}

module.exports = AccountController