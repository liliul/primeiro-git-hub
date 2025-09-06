import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// const API_KEY = process.env.YOUTUBE_API_KEY;
// const BASE_URL = 'https://www.googleapis.com/youtube/v3/videos';

// async function getTrendingVideos(regionCode = 'BR', maxResults = 2) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         part: 'snippet,statistics',
//         chart: 'mostPopular',
//         regionCode: regionCode,
//         maxResults: maxResults,
//         key: API_KEY
//       }
//     });

//     const videos = response.data.items;
//     console.log('v: ',videos);

//     // console.log(`📺 Vídeos em alta no YouTube (${regionCode}):\n`);

//     // videos.forEach((video, index) => {
        
//     //   const title = video.snippet.title;
//     //   const channel = video.snippet.channelTitle;
//     //   const views = video.statistics.viewCount;

//     //   console.log(`${index + 1}. ${title}`);
//     //   console.log(`   Canal: ${channel}`);
//     //   console.log(`   Visualizações: ${views}\n`);
//     // });

//   } catch (error) {
//     console.error('Erro ao buscar vídeos populares:', error.response?.data || error.message);
//   }
// }

// getTrendingVideos('US');



class YouTubeSearch {
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
      return [];
    }
  }
}

const ytSearch = new YouTubeSearch();

const results = await ytSearch.searchVideos("nodejs tutorial", 3, "viewCount");

console.log(results);

