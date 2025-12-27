import axios from "axios";
import { getValidGoogleToken } from "../utils/getValidGoogleToken.js";
import { playlistLogger } from "./playlistLogger.js";
import { sanitizeAxiosError } from "../utils/sanitizeAxiosError.js";

export async function getMyPlayList(req, res) {
  try {
    const googleId = req.user.sub; 
    const accessToken = await getValidGoogleToken(googleId)

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          part: "snippet,contentDetails",
          mine: true,
          maxResults: 25
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (!response.data.items || response.data.items.length === 0) {
      return res.json([]);
    }

    const playListItems = await Promise.all(response.data.items.map(async (i) => {
      console.log(i);
      const videos = await getPlaylistVideos(accessToken, i.id)

      return {
        id: i.id,
        title: i.snippet.title,
        thumbnailList: i.snippet.thumbnails?.default?.url,
        videos: videos.items.map((video) => ({
          videoId: video.snippet?.resourceId?.videoId,
          title: video.snippet.title,
          url: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
          thumbnail: video.snippet.thumbnails?.medium?.url
        }))
      }

    }))

    res.json(playListItems);
  } catch (error) {
    console.error('Erro no getMyPlayList: ', error);

    playlistLogger.error({
      service: 'getMyPlayList',
      method: 'buscando videos de playlists youtube',
      error: sanitizeAxiosError(error),
    })

    res.status(500).json({ error: "Erro ao buscar playlists" }); 
  }
}

async function getPlaylistVideos(accessToken, playlistId) {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/playlistItems",
    {
      params: {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 25
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
}