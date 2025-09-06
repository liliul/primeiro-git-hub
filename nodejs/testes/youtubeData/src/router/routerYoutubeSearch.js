import express from 'express'
import YoutubeSearchController from '../youtubeSearch/controller/youtubeSearchController.js'

const routerYoutubeSearch = express.Router()
const searchController = new YoutubeSearchController()

routerYoutubeSearch.post('/ytsearch', async (req, res) => {
    const { query } = req.body
    const search = await searchController.searchVideos(query, 3)
    console.log(search);
    
    res.status(200).json({ message: 'ok', data: search})
})

export default routerYoutubeSearch