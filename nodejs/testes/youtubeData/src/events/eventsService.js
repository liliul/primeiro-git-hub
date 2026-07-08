import crypto from 'crypto'

class EventsService {
    constructor(eventsRepository, sseManager) {
        this.eventsRepository = eventsRepository
        this.sseManager = sseManager

        this.countVideosAlta = null
    }

    async checkNotifyVideosAlta() {
        if (!this.sseManager.checkClientsExists()) return
        
        const videosYoutubeAlta = await this.eventsRepository.getCountVideosAlta()
        
        if (videosYoutubeAlta === null) return 
        
        const videosTotal = Number(videosYoutubeAlta)
        console.log('v', videosTotal);
        
        if (videosTotal === this.countVideosAlta) return
        
        this.countVideosAlta = videosTotal
    
        const notifyCountVideosAlta = {
            id: crypto.randomUUID(),
            type: 'YOUTUBE_VIDEOS_ALTA',
            quanty: videosTotal,
            status: 'success',
            createAt: new Date()
        }
        
        this.sseManager.broadcast('notification', notifyCountVideosAlta)
    }
}

export default EventsService