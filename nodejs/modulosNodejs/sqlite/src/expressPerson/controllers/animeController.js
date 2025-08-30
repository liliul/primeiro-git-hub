const logger = require("../logger/logger");

class AnimeController {
    constructor(db) {
        this.db = db
    }
    create(req, res) {
        const {nome_anime, pais_origem} = req.body 
        
        const adminCreate = req.user?.username || 'Desconhecido'
        const roles = req.user?.role || 'Desconhecido'

        this.db.serialize(() => {
            const stmt = this.db.prepare("INSERT INTO anime (nome_anime, pais_origem) VALUES (?, ?)");
            stmt.run(nome_anime, pais_origem, function(err) {
                if (err) {
                    logger.error(`[POST] erro ao criar anime ${adminCreate}-${roles}.`)
                    res.status(401).json({ message: 'Erro ao inserir dados:', erro: err.message});
                } else {   
                    logger.warn(`[POST] ${adminCreate}-${roles} criou novo anime`)
                    res.status(200).json({message: `Usuário inserido com sucesso! ID: ${this.lastID}`});
                }
            });

            stmt.finalize();
        });
    }

    search(req, res) {
        const results = []
        this.db.serialize(() => {
            this.db.each("SELECT * FROM anime", (err, row) => {
                if (err) {
                    res.status(401).json({message: 'Erro ao consultar dados:', erro: err.message})
                } 

                results.push(row);
            });
            this.db.get("SELECT COUNT(*) as count FROM anime", (err, countRow) => {
                if (err) {
                    return res.status(401).json({ message: 'Erro ao contar dados:', erro: err.message });
                }

                res.status(200).json({ message: 'Dados encontrados', data: results, total: countRow.count });
            });
        })
    }

    searchID(req, res) {
        const { id } = req.params
        
        if (!id) return console.log('erro id');
        
        this.db.get("SELECT * FROM anime WHERE id = ?", [id], (err, row) => {
            if (err) {
                return res.status(401).json({ message: 'Erro ao pesquisa por ID:', erro: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: `Nenhum registro encontrado com ID ${id}` });
            }

            res.status(200).json({ message: 'Dados encontrados', data: row });
        });
    }

    delete(req, res) {
        const { id } = req.params

        const adminDelete = req.user?.username || 'Desconhecido'
        const roles = req.user?.role || 'Role-Desconhecido'

        this.db.serialize(() => {
            const stmt = this.db.prepare('DELETE FROM anime WHERE id = ?')
            stmt.run(id, (err) => {
                if (err) {
                    logger.error(`[DELETE] ${adminDelete}-${roles} excluir o anime com ID: ${id} err: ${err.message}`)
                    res.status(401).json({ message: 'Erro ao deleta anime', erro: err.message })
                } else {
                    logger.warn(`[DELETE] ${adminDelete}-${roles} excluir o anime com ID: ${id}`)
                    res.status(200).json({ message: `ID ${id} excluido.`, row: this.changes })
                }
            })

            stmt.finalize()
        })
    }

    update(req, res) {
        const { id } = req.params
        const { nome_anime, pais_origem } = req.body
        this.db.serialize(() => {
            const stmt = this.db.prepare("UPDATE anime SET nome_anime = ?, pais_origem = ? WHERE id = ?")
            stmt.run(nome_anime, pais_origem, id, (err) => {
                if (err) {
                    res.status(401).json({ message: 'Erro ao atualizar persons' })
                } else {
                    res.status(200).json({ message: `ID ${id} atualizado com sucesso!`, row: this.changes })
                }
            })

            stmt.finalize()
        })
    }
}

module.exports = AnimeController