import express from 'express'
import routerHealth from './router/health.js';
import routerAccount from './router/routerAccount.js';

const app = express()
app.use(express.json());

app.use(routerHealth)
app.use(routerAccount)

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
