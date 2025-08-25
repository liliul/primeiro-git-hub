const express = require('express')
const db = require('../database')
const AnimeController = require('../controllers/animeController')

const routerAnime = express.Router()

const animeController = new AnimeController(db)

routerAnime.post('/create-anime', animeController.create.bind(animeController))
routerAnime.get('/search', animeController.search.bind(animeController))
routerAnime.get('/search/:id', animeController.searchID.bind(animeController))
routerAnime.delete('/delete-anime/:id', animeController.delete.bind(animeController))
routerAnime.put('/update-anime/:id', animeController.update.bind(animeController))

module.exports = routerAnime