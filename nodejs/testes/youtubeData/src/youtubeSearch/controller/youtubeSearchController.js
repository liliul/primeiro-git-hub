import YoutubeSearchVideoUtils from '../utils/searchVideos.js';

class YoutubeSearchController {
    constructor() {
       
        this.youtubeSearchVideoUtils = new YoutubeSearchVideoUtils()
    }

    async buscarNoYoutube(query, maxResults, order){
        return this.youtubeSearchVideoUtils.searchVideos(query, maxResults, order)
    }
}

export default YoutubeSearchController