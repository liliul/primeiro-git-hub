import crypto from 'crypto'

class EventsService {
    constructor(eventsRepository, sseManager) {
        this.eventsRepository = eventsRepository
        this.sseManager = sseManager

        this.countVideosAlta = null
    }

    async checkNotifyVideosAlta() {
        const uuid = crypto.randomUUID()
            
        if (!this.sseManager.checkClientsExists()) return
        
        const videosYoutubeAlta = await this.eventsRepository.getCountVideosAlta()
        
        if (videosYoutubeAlta === null) return 
        
        const videosTotal = Number(videosYoutubeAlta)
        console.log('v', videosTotal);
        
        if (videosTotal === this.countVideosAlta) return
        
        this.countVideosAlta = videosTotal
    
        const youtubeAlta = {
            id: uuid,
            type: 'YOUTUBE_VIDEOS_ALTA',
            quanty: videosTotal,
            status: 'success',
            createAt: new Date()
        }
        
        this.sseManager.broadcast('notification', youtubeAlta)
    }
}

export default EventsService