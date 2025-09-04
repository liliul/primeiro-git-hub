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
            
            res.status(200).json({ message: `[${req.method}] url-${req.url} retornando os videos em alta youtube`, count: data.length})

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

            res.status(200).json({
                message: 'Vídeos em alta salvos no banco de dados',
                count: data.rows.length,
                data: data.rows
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