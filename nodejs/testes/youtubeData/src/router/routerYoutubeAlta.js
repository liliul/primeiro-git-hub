import express from 'express'
import db from '../db/conection_db.js'


import YoutubeAlta from '../controllers/youtubeAltaController.js'
import GetTrendingVideos from '../utils/getTrendingVideos.js'

const routerYoutubeAlta = express.Router()

const youtubeAlta = new YoutubeAlta(db)
const getTrendingVideos = new GetTrendingVideos()

routerYoutubeAlta.get('/ytvideo/:id', youtubeAlta.infoDoYoutubeEmAlta.bind(youtubeAlta))

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
        const videos = await getTrendingVideos.getTrendingVideos(regionCode, 1)
        
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

export default routerYoutubeAlta