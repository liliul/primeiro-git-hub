const express = require('express')
const db = require('./database')   
const router = express.Router() 
const personController = require('./controllers/personController')

router.post('/createperson', personController.create.bind(personController))
// router.post('/createperson', (req, res) => {
//     const {nome, anime} = req.body 
//     console.log(nome, anime);
    
//     db.serialize(() => {
//         const stmt = db.prepare("INSERT INTO person (nome, anime) VALUES (?, ?)");
//         stmt.run(nome, anime, function(err) {
//             if (err) {
//                 res.status(401).json({ message: 'Erro ao inserir dados:', erro: err.message});
//             } else {
//                 res.status(200).json({message: `Usuário inserido com sucesso! ID: ${this.lastID}`});
//             }
//         });

//         stmt.finalize();
//     });
// })

router.get('/search', personController.search.bind(personController))
// router.get('/search', (req, res) => {
//     const results = []
//     db.serialize(() => {
//         db.each("SELECT * FROM person", (err, row) => {
//             if (err) {
//                 res.status(401).json({message: 'Erro ao consultar dados:', erro: err.message})
//             } 

//             results.push(row);
//         });
//         db.get("SELECT COUNT(*) as count FROM person", (err, countRow) => {
//             if (err) {
//                 return res.status(401).json({ message: 'Erro ao contar dados:', erro: err.message });
//             }

//             res.status(200).json({ message: 'Dados encontrados', data: results, total: countRow.count });
//         });
//     })
// })

router.get('/search/:id', personController.searchID.bind(personController))
// router.get('/search/:id', (req, res) => {
//     const { id } = req.params
//     console.log(id);
    
//     if (!id) return console.log('erro id');
    
//     db.get("SELECT * FROM person WHERE id = ?", [id], (err, row) => {
//         if (err) {
//             return res.status(401).json({ message: 'Erro ao pesquisa por ID:', erro: err.message });
//         }
//         if (!row) {
//             return res.status(404).json({ message: `Nenhum registro encontrado com ID ${id}` });
//         }

//         res.status(200).json({ message: 'Dados encontrados', data: row });
//     }); 
// })

router.delete('/deletandoperson/:id', personController.delete.bind(personController))
// router.delete('/deletandoperson/:id', (req, res) => {
//     const { id } = req.params
//     db.serialize(() => {
//         const stmt = db.prepare('DELETE FROM person WHERE id = ?')
//         stmt.run(id, (err) => {
//             if (err) {
//                 res.status(401).json({ message: 'Erro ao deleta person', erro: err.message })
//             } else {
//                 res.status(200).json({ message: `ID ${id} excluido.`, row: this.changes })
//             }
//         })

//         stmt.finalize()
//     })
// })

router.put('/atualizarperson/:id', personController.update.bind(personController))
// router.put('/atualizarperson/:id', (req, res) => {
//     const { id } = req.params
//     const { nome, anime } = req.body
//     db.serialize(() => {
//         const stmt = db.prepare("UPDATE person SET nome = ?, anime = ? WHERE id = ?")
//         stmt.run(nome, anime, id, (err) => {
//             if (err) {
//                 res.status(401).json({ message: 'Erro ao atualizar persons' })
//             } else {
//                 res.status(200).json({ message: `ID ${id} atualizado com sucesso!`, row: this.changes })
//             }
//         })

//         stmt.finalize()
//     })
// })


module.exports = { router }