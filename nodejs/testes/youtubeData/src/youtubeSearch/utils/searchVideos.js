import axios from 'axios';
import dotenv from 'dotenv';
import { searchLogger } from './searchLogger.js';
import { sanitizeAxiosError } from '../../utils/sanitizeAxiosError.js';
dotenv.config();

class YoutubeSearchVideoUtils {
    constructor() {
        this.API_KEY = process.env.YOUTUBE_API_KEY;
        this.BASE_URL = "https://www.googleapis.com/youtube/v3";
    }

    async searchVideos(query, maxResults = 5, order = "relevance") {
        try {
        const res = await axios.get(`${this.BASE_URL}/search`, {
            params: {
            part: "snippet",
            q: query,
            type: "video",
            maxResults,
            order,
            key: this.API_KEY,
            },
        });
        
        return res.data.items.map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnails: item.snippet.thumbnails,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
        } catch (error) {
        console.error("Erro ao buscar vídeos:", error.response?.data || error.message);

        searchLogger.error({
            service: 'searchVideos',
            method: 'Pesquisando videos no youtube',
            error: sanitizeAxiosError(error),
        })

        return [];
        }
    }
}

export default YoutubeSearchVideoUtils