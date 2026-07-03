import express from 'express'
import crypto from 'crypto'
import cron from 'node-cron'
import pool from '../db/conection_db.js';
import { redis } from '../db/redis.js';

const eventsRouter = express.Router()
const clients = new Set();

let countVideosAlta = null
let cacheKey = `youtube:alta:countVideos`

eventsRouter.get('/events', async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    clients.add(res)

    req.on('close', () => {
        clients.delete(res)
    })
})

cron.schedule("*/10 * * * * *", async () => {
    try {
        const uuid = crypto.randomUUID()
        
        if (clients.size === 0) return

        const videosYoutubeAlta = await redis.get(cacheKey)
        
        if (videosYoutubeAlta === null) return 
        
        const videosTotal = Number(videosYoutubeAlta)
        console.log('v', videosTotal);
           
        if (videosTotal === countVideosAlta) return
        
        countVideosAlta = videosTotal
            
        const youtubeAlta = {
            id: uuid,
            type: 'YOUTUBE_VIDEOS_ALTA',
            quanty: videosTotal,
            status: 'success',
            createAt: new Date()
        }
        
        const payload = `event: notification\n` + `data: ${JSON.stringify(youtubeAlta)}\n\n`
        
        for (const client of clients) {

            client.write(payload);

        }
        
    } catch (error) {
        console.error(error.message);
    }
})

export default eventsRouter