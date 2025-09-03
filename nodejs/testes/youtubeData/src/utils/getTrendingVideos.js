import axios  from 'axios'
import dotenv from 'dotenv'

dotenv.config()

class GetTrendingVideos {
    constructor() {
        this.API_KEY = process.env.YOUTUBE_API_KEY;
        this.BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';
    }
    
    async getTrendingVideos(regionCode = 'BR', maxResults = 2) {
        try {
            const response = await axios.get(this.BASE_URL, {
            params: {
                part: 'snippet,statistics',
                chart: 'mostPopular',
                regionCode: regionCode,
                maxResults: maxResults,
                key: this.API_KEY
            }
            });

            const videos = response.data.items;
            return videos
            
        } catch (error) {
            console.error('Erro ao buscar vídeos populares:', error.response?.data || error.message);
        }
    }
}

export default GetTrendingVideos