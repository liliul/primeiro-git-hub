import express from 'express'
import { getMyChannel, getMyPlayList } from '../youtubeChannel/youtubeChannelController.js'
import authRequirida from '../middleware/autenticandoRotas.js'

const routerYoutubeUser = express.Router()

routerYoutubeUser.get('/ytuser', authRequirida, getMyChannel)
routerYoutubeUser.get('/ytlist', authRequirida, getMyPlayList)

export default routerYoutubeUser