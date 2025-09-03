import YoutubeAltaRepository from "../repository/youtubeAltaRepository.js"

class YoutubeAlta {
    constructor(db) {
        this.db = db
        
        this.youtubeAltaRepository = new YoutubeAltaRepository(this.db)
    }

    async infoDoYoutubeEmAlta(req, res) {
        try {
            const { id: regionCode } = req.params
            const data = await this.youtubeAltaRepository.connectYoutubeAlta(regionCode)
            
            res.status(200).json({ message: `[${req.method}] url-${req.url} retornando os videos em alta youtube`, count: data.length})

        } catch (error) {
            res.status(500).json({ 
                message: 'Erro ao buscar vídeos em alta do YouTube',
                error: error.response?.data || error.message 
            })   
        }
    }
} 

export default YoutubeAlta