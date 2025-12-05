import express from 'express'
import routerHealth from './router/health.js';
import routerAccount from './router/routerAccount.js';
import routerYoutubeAlta from './router/routerYoutubeAlta.js';
import routerYoutubeSearch from './router/routerYoutubeSearch.js';
import routerGoogleAuth from './router/googleAuth2.js';
import cors from 'cors'
// import './node_cron/index.js'

const app = express()
app.use(express.json());
app.use(cors({
  origin: "http://localhost:8081",
  credentials: true,
}));

app.use(routerHealth)
app.use(routerAccount)
app.use('/youtube/v1', routerYoutubeAlta)
app.use('/youtube/v2', routerYoutubeSearch)
app.use("/auth", routerGoogleAuth)

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
