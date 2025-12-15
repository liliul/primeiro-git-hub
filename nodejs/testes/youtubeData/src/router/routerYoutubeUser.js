import express from 'express'
import { getMyChannel } from '../youtubeUser/controller.js'
import authRequirida from '../middleware/autenticandoRotas.js'

const routerYoutubeUser = express.Router()

routerYoutubeUser.get('/ytuser', authRequirida, getMyChannel)

export default routerYoutubeUser