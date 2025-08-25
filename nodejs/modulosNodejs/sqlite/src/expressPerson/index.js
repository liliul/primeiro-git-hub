const express = require('express')
const db = require('./database')
const { router } = require('./router')
    
const app = express()
const port = 3000

app.use(express.json())


app.use('/', router)

process.on('SIGINT', () => {
    console.log('Fechando o servidor...');
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar o banco de dados:', err.message);
        } else {
            console.log('Banco de dados fechado com sucesso.');
        }
        process.exit();
    });
});

app.listen(port, () => {
    console.log('Servidor na porta: ', port);
})