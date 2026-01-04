import express from 'express'
import db from '../db/conection_db.js'
import { redis } from '../db/redis.js'

import YoutubeAlta from '../youtubeAlta/controllers/youtubeAltaController.js'
import GetTrendingVideos from '../youtubeAlta/utils/getTrendingVideos.js'

const routerYoutubeAlta = express.Router()

const youtubeAlta = new YoutubeAlta(db)
const getTrendingVideos = new GetTrendingVideos()

routerYoutubeAlta.get('/ytvideo/:id', youtubeAlta.infoDoYoutubeEmAlta.bind(youtubeAlta))

routerYoutubeAlta.get('/ytvideos', youtubeAlta.buscarDadosDoYoutubeAlta.bind(youtubeAlta))

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

routerYoutubeAlta.get('/yaltavideos/:UF', async (req, res) => {
  try {
    const { UF } = req.params
    const cacheKey = `youtube:alta:videos:${UF}`

    const cached = await redis.get(cacheKey)
    if (cached) {
      return res.status(200).json({
        source: 'redis',
        ...JSON.parse(cached)
      })
    }

    const videos = await db.query(`SELECT * FROM youtube_videos WHERE region_code = $1`, [UF])
    // console.log(videos.rows)

    const payload = {
      message: 'retornando yaltavideos',
      length: videos.rows.length,
      data: videos.rows
    }

    await redis.set(cacheKey, JSON.stringify(payload), {
      EX: 600
    })

    res.status(200).json({
      source: 'postgres',
      ...payload
    })
  } catch (error) {
    res.status(401).json({ message: 'Erro ao pegar videos pelo id=JP', erro: error})
  }
})

export default routerYoutubeAlta