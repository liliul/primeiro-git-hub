import { redis } from "../../db/redis.js"
import YoutubeAltaService from "../services/youtubeAltaService.js"

class YoutubeAlta {
    constructor(db) {
        this.db = db
        
        this.youtubeAltaService = new YoutubeAltaService(this.db)
    }

    async infoDoYoutubeEmAlta(req, res) {
        try {
            const { id: regionCode } = req.params
            const { maxResults } = req.query

            const data = await this.youtubeAltaService.buscarYoutubeEmAlta(regionCode, maxResults)
            
            res.status(200).json({ message: `[${req.method}] url-${req.url} retornando os videos em alta youtube`, count: data.length, rows: data})

        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao buscar vídeos em alta do YouTube',
                error: error.response?.data || error.message 
            })   
        }
    }

    async buscarDadosDoYoutubeAlta(req, res) {
        try {
            const data = await this.youtubeAltaService.buscarVideosSalvos()
           
            const chave = 'listando-videos-salvos'
            const cacheKey = `youtube:listavideos:${chave}`
            const cached = await redis.get(cacheKey)
            if (cached) {
                return res.json({redisytvideos: JSON.parse(cached)})
            }
            
            console.log('chamando api de lista videos salvos no banco de dados')
            
            const dataCache = {
                message: 'Vídeos em alta salvos no banco de dados',
                count: data.rows.length,
                data: data.rows
            }
            await redis.set(cacheKey, JSON.stringify(dataCache), {
                EX: 900 // 60 * 15 = 900 -> 15 min
            })

            res.status(200).json({
               ytvideos: dataCache
            })
        } catch (error) {
            res.status(500).json({
                message: 'Erro ao buscar vídeos no banco de dados',
                error: error.message
            })
        }
    }
} 

export default YoutubeAlta