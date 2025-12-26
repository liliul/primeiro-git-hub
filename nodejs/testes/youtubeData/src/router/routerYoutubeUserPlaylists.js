import express from 'express'
import { getMyChannel } from '../youtubeChannel/youtubeChannelController.js'
import { getMyPlayList } from '../youtubePlaylists/youtubePlaylistsController.js'
import authRequirida from '../middleware/autenticandoRotas.js'

const routerYoutubeUser = express.Router()

routerYoutubeUser.get('/ytuser', authRequirida, getMyChannel)
routerYoutubeUser.get('/ytlist', authRequirida, getMyPlayList)

export default routerYoutubeUser