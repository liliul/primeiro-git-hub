import express from 'express'
import YoutubeSearchController from '../youtubeSearch/controller/youtubeSearchController.js'
import authRequirida from '../middleware/autenticandoRotas.js'

const routerYoutubeSearch = express.Router()
const searchController = new YoutubeSearchController()

routerYoutubeSearch.post('/ytsearch', authRequirida, async (req, res) => {
    const { query } = req.body
    const search = await searchController.buscarNoYoutube(query, 3)
    console.log(search);
    
    res.status(200).json({ message: 'ok', data: search})
})

export default routerYoutubeSearch