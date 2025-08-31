const express = require('express')
const db = require('./database')
const { router } = require('./router')
const routerAnime = require('./routers/animeRouter')
const accountRouter = require('./routers/accountRouter')

const app = express()
const port = 3001

app.use(express.json())


app.use('/', router)
app.use('/animes/v1/', routerAnime)
app.use('/account/', accountRouter)

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