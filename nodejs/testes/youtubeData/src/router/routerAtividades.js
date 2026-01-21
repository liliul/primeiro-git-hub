import express from 'express'
import AtividadesYoutube from '../youtubeAtividades/atividadesController.js'
import authRequirida from '../middleware/autenticandoRotas.js'

const routerAtividades = express.Router()

const atividadesController = new AtividadesYoutube()

routerAtividades.get('/atividades', authRequirida, atividadesController.atividades.bind(atividadesController))

export default routerAtividades