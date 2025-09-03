import express from 'express'
import axios  from 'axios'
import dotenv from 'dotenv'
import db from '../db/conection_db.js'

dotenv.config()

const routerYoutubeAlta = express.Router()

routerYoutubeAlta.get('/ytvideo/:id', async (req, res) => {
  const { id: regionCode } = req.params
    try {
        const videos = await getTrendingVideos(regionCode)
   
        const queryText = `
          INSERT INTO youtube_videos
            (video_id, title, description, channel, published_at, thumbnails, tags, statistics, video_url, etag, channel_id, region_code)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (video_id) DO UPDATE
            SET title = EXCLUDED.title,
                description = EXCLUDED.description,
                channel = EXCLUDED.channel,
                published_at = EXCLUDED.published_at,
                thumbnails = EXCLUDED.thumbnails,
                tags = EXCLUDED.tags,
                statistics = EXCLUDED.statistics,
                video_url = EXCLUDED.video_url,
                etag = EXCLUDED.etag,
                channel_id = EXCLUDED.channel_id,
                region_code = EXCLUDED.region_code,
                criado_em = NOW()
          RETURNING *;
        `;
                  
        await Promise.all(videos.map(item => {
              const values = [
                item.id,
                item.snippet.title,
                item.snippet.description,
                item.snippet.channelTitle,
                item.snippet.publishedAt,
                JSON.stringify(item.snippet.thumbnails),
                item.snippet.tags || [],
                JSON.stringify(item.statistics),
                `https://youtu.be/${item.id}`,
                item.etag,
                item.snippet.channelId,
                regionCode
              ];

              return db.query(queryText, values);
        }))
        
        res.status(200).json({ message: 'retornando 10 videos em alta youtube', count: videos.length})

      } catch (error) {
        res.status(500).json({ 
          message: 'Erro ao buscar vídeos em alta do YouTube',
          error: error.response?.data || error.message 
        })
    }
})

routerYoutubeAlta.get('/ytvideos', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        id,
        video_id,
        title,
        description,
        channel,
        published_at,
        thumbnails,
        tags,
        statistics,
        video_url,
        etag,
        channel_id,
        region_code,
        criado_em
      FROM youtube_videos
      ORDER BY criado_em DESC
      LIMIT 50
    `);

    res.status(200).json({
      message: 'Vídeos em alta salvos no banco de dados',
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar vídeos no banco de dados',
      error: error.message
    });
  }
});

routerYoutubeAlta.get('/ytalta/:id', async (req, res) => {
  const { id: regionCode } = req.params
    try {
        const videos = await getTrendingVideos(regionCode)
        
        const c = videos.map((item) => {
          return {
            title: item.snippet.title,
            description: item.description,
            channel: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnail: {
              high: item.snippet.thumbnails?.high?.url,
              default: item.snippet.thumbnails?.default?.url,
              medium: item.snippet.thumbnails?.medium?.url,
            },
            videoId: item.id,
            tags: item.snippet.tags,
            statistics: {
              views: item.statistics?.viewCount || '0',
              likes: item.statistics?.likeCount || '0',
              comments: item.statistics?.commentCount || '0'
            },
            videoUrl: `https://youtu.be/${item.id}`,
            etag: item.etag,
            channelId: item.snippet.channelId,
            regionCode: regionCode
          }
        });

       
       res.status(200).json({ message: 'retornando 10 videos em alta youtube', data: c})

      } catch (error) {
        if (error) {
          res.status(500).json({ 
            message: 'Erro ao buscar vídeos em alta do YouTube',
            error: error.response?.data || error.message 
          })
        }
    }
})


const API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

async function getTrendingVideos(regionCode = 'BR', maxResults = 2) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: regionCode,
        maxResults: maxResults,
        key: API_KEY
      }
    });

    const videos = response.data.items;
    return videos
    
  } catch (error) {
    console.error('Erro ao buscar vídeos populares:', error.response?.data || error.message);
  }
}

export default routerYoutubeAlta