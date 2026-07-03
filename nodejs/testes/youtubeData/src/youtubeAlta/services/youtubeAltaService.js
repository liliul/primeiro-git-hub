import GetTrendingVideos from "../utils/getTrendingVideos.js"
import YoutubeAltaRepository from "../repository/youtubeAltaRepository.js"
import { redis } from "../../db/redis.js"

class YoutubeAltaService {
    constructor(db) {
        this.db = db 
        this.cacheKey

        this.getTrendingVideos = new GetTrendingVideos()
        this.youtubeAltaRepository = new YoutubeAltaRepository(this.db)
    }

    async buscarYoutubeEmAlta(regionCode, maxResults) {
        this.cacheKey = `youtube:alta:countVideos`

        const videos = await this.getTrendingVideos.getTrendingVideos(regionCode, maxResults)

        await this.youtubeAltaRepository.salvarVideos(videos, regionCode)

        const countVideos = await this.youtubeAltaRepository.countVideosAlta()

        await redis.set(this.cacheKey, countVideos)

        return videos
    }

    async buscarVideosSalvos() {
        return this.youtubeAltaRepository.queryBuscaDadosYoutubeAlta()
    }
}

export default YoutubeAltaService