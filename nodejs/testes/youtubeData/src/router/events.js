import express from 'express'
import crypto from 'crypto'
import pool from '../db/conection_db.js';

const eventsRouter = express.Router()
const uuid = crypto.randomUUID()

eventsRouter.get('/events', async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders();

    const videosYoutubeAlta = await pool.query(`
        select * from youtube_videos    
    `)
    
    if (videosYoutubeAlta.rowCount === 0) return null

    console.log(videosYoutubeAlta.rowCount);
    

    const youtubeAlta = {
        id: uuid,
        type: 'YOUTUBE_VIDEOS_ALTA',
        quanty: videosYoutubeAlta.rowCount,
        status: 'success',
        createAt: new Date()
    }

    const payload = `event: notification\n` + `data: ${JSON.stringify(youtubeAlta)}\n\n`

    res.write(payload);


    req.on('close', () => {
        res.end()
    })
})

export default eventsRouter