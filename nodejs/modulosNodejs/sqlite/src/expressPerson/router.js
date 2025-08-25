const express = require('express')
const db = require('./database')   
const router = express.Router() 

router.post('/createperson', (req, res) => {
    const {nome, anime} = req.body 
    console.log(nome, anime);
    
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO person (nome, anime) VALUES (?, ?)");
        stmt.run(nome, anime, function(err) {
            if (err) {
                res.status(401).json({ message: 'Erro ao inserir dados:', erro: err.message});
            } else {
                res.status(200).json({message: `Usuário inserido com sucesso! ID: ${this.lastID}`});
            }
        });

        stmt.finalize();
    });
})

router.get('/search', (req, res) => {
    const results = []
    db.serialize(() => {
        db.each("SELECT * FROM person", (err, row) => {
            if (err) {
                res.status(401).json({message: 'Erro ao consultar dados:', erro: err.message})
            } 

            results.push(row);
        });
        db.get("SELECT COUNT(*) as count FROM person", (err, countRow) => {
            if (err) {
                return res.status(401).json({ message: 'Erro ao contar dados:', erro: err.message });
            }

            res.status(200).json({ message: 'Dados encontrados', data: results, total: countRow.count });
        });
    })
})


module.exports = { router }