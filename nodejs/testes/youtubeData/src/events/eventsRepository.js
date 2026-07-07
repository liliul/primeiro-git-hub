import { redis } from "../db/redis.js";


class EventsRepository {
    constructor() {
        this.cacheKey = 'youtube:alta:countVideos'
    }

    async getCountVideosAlta() {
        const videosYoutubeAlta = await redis.get(this.cacheKey)
        
        if (videosYoutubeAlta === null) return null

        return Number(videosYoutubeAlta)
    }
}

export default EventsRepository