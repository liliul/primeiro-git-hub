import express from 'express'
import routerHealth from './router/health.js';
import routerAccount from './router/routerAccount.js';
import routerYoutubeAlta from './router/routerYoutubeAlta.js';
import routerYoutubeSearch from './router/routerYoutubeSearch.js';

// import './node_cron/index.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json());

app.use(routerHealth)
app.use(routerAccount)
app.use('/youtube/v1', routerYoutubeAlta)
app.use('/youtube/v2', routerYoutubeSearch)

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
