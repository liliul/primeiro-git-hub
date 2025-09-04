import GetTrendingVideos from "../utils/getTrendingVideos.js"
import YoutubeAltaRepository from "../repository/youtubeAltaRepository.js"

class YoutubeAltaService {
    constructor(db) {
        this.db = db 

        this.getTrendingVideos = new GetTrendingVideos()
        this.youtubeAltaRepository = new YoutubeAltaRepository(this.db)
    }

    async buscarYoutubeEmAlta(regionCode, maxResults) {
        const videos = await this.getTrendingVideos.getTrendingVideos(regionCode, maxResults)

        await this.youtubeAltaRepository.salvarVideos(videos, regionCode)

        return videos
    }

    async buscarVideosSalvos() {
        return this.youtubeAltaRepository.queryBuscaDadosYoutubeAlta()
    }
}

export default YoutubeAltaService