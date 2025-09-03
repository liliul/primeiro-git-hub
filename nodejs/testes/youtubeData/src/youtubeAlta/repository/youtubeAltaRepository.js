import GetTrendingVideos from "../utils/getTrendingVideos.js";

class YoutubeAltaRepository {
    constructor(db) {
        this.db = db
        this.getTrendingVideos = new GetTrendingVideos()
    }

    async connectYoutubeAlta(regionCode) {
            const videos = await this.getTrendingVideos.getTrendingVideos(regionCode)

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

                    return this.db.query(queryText, values);
            }))

            return videos
    }
}

export default YoutubeAltaRepository