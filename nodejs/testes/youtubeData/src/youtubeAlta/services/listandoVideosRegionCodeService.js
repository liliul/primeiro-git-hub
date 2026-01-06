import ListandoVideosRegionCodeRepository from "../repository/listandoVideosRegionCodeRepository.js"
import { redis } from "../../db/redis.js"

class ListandoVideosRegionCodeService {
    constructor(db) {
        this.db = db 

        this.listandoVideosRegionCodeRepository = new ListandoVideosRegionCodeRepository(this.db)
    }

    async listandoVideosService(uf) {
        const cacheKey = `youtube:alta:videos:${uf}`

        const cached = await redis.get(cacheKey)
        if (cached) {
            return {
                source: 'redis',
                ...JSON.parse(cached)
            }
        }

        const videos = await this.listandoVideosRegionCodeRepository.queryListandoVideosRegionCode(uf)
        
        const payload = {
            message: 'retornando yaltavideos',
            length: videos.rows.length,
            data: videos.rows
        }

        await redis.set(cacheKey, JSON.stringify(payload), {
            EX: 600
        })

        return {
            source: 'postgres',
            ...payload
        }
    }
}

export default ListandoVideosRegionCodeService