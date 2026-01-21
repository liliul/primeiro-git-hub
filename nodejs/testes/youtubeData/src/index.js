import express from 'express'
import routerHealth from './router/health.js';
import routerAccount from './router/routerAccount.js';
import routerYoutubeAlta from './router/routerYoutubeAlta.js';
import routerYoutubeSearch from './router/routerYoutubeSearch.js';
import routerGoogleAuth from './router/routerGoogleAuth2.js';
import cors from 'cors'
import path from 'node:path';
import cookieParser from 'cookie-parser';
import routerYoutubeUser from './router/routerYoutubeUserPlaylists.js';
import routerError from './router/routerError.js';
import routerUtils from './router/routerUtils.js';
import routerAtividades from './router/routerAtividades.js';

// import './node_cron/index.js'

const __dirname = path.resolve();

const app = express()
app.use(express.json());
app.use(cors({
  origin: "http://localhost:8081",
  credentials: true,
}))
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.use(routerHealth)
app.use(routerAccount)
app.use('/youtube/v1', routerYoutubeAlta)
app.use('/youtube/v2', routerYoutubeSearch)
app.use("/auth", routerGoogleAuth)
app.use('/v3', routerUtils)
app.use('/', routerYoutubeUser)
app.use('/', routerAtividades)
app.use('/', routerError)


app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
