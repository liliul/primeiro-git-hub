const express = require('express')
const db = require('../database')
const AnimeController = require('../controllers/animeController')
const authenticateToken = require('../middleware/auth')
const authorizeRoles = require('../middleware/authRoles')

const routerAnime = express.Router()

const animeController = new AnimeController(db)

routerAnime.post('/create-anime', authenticateToken, authorizeRoles('admin', 'master'), animeController.create.bind(animeController))
routerAnime.get('/search', animeController.search.bind(animeController))
routerAnime.get('/search/:id', animeController.searchID.bind(animeController))
routerAnime.delete('/delete-anime/:id', authenticateToken, authorizeRoles('admin', 'master'), animeController.delete.bind(animeController))
routerAnime.put('/update-anime/:id', authenticateToken, authorizeRoles('admin', 'master'), animeController.update.bind(animeController))

module.exports = routerAnime