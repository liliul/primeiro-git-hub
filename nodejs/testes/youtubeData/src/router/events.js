import express from 'express'
import crypto from 'crypto'
import cron from 'node-cron'
import pool from '../db/conection_db.js';

const eventsRouter = express.Router()
const clients = new Set();

let countVideosAlta = null

eventsRouter.get('/events', async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    clients.add(res)

    req.on('close', () => {
        clients.delete(res)
    })

    cron.schedule("*/10 * * * * *", async () => {
        try {
            const uuid = crypto.randomUUID()

            const videosYoutubeAlta = await pool.query(`
                select COUNT(*) AS total from youtube_videos    
                `)
                
            const videosTotal = Number(videosYoutubeAlta.rows[0].total)

            if (videosTotal === 0) return null
              
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
            
            console.log(countVideosAlta);
            
        } catch (error) {
            console.error(error.message);
        }
    })
})

function youtubeVideosAltaCron() {
    
}

export default eventsRouter