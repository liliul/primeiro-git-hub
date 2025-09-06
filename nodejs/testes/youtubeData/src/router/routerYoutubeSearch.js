import express from 'express'
import YoutubeSearchController from '../youtubeSearch/controller/youtubeSearchController.js'

const routerYoutubeSearch = express.Router()
const searchController = new YoutubeSearchController()

routerYoutubeSearch.get('/ytsearch', async (req, res) => {
    const search = await searchController.searchVideos("abertura de dragon ball z", 3, "viewCount")
    console.log(search);
    
    res.status(200).json({ message: 'ok', data: search})
})

export default routerYoutubeSearch