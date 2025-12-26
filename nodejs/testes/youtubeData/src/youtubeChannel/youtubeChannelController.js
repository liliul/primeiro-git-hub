import axios from "axios";
import { getValidGoogleToken } from "../utils/getValidGoogleToken.js";
import { redis } from "../db/redis.js";

export async function getMyChannel(req, res) {
  try {
    const googleId = req.user.sub;
    const cacheKey = `youtube:channel:${googleId}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json({ redisytuser: JSON.parse(cached) });
    }

    console.log('Chamando api ytuser');
    
    const accessToken = await getValidGoogleToken(googleId);

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          part: "snippet,statistics",
          mine: true,
        },
      }
    )

    await redis.set(cacheKey, JSON.stringify(response.data), {
      EX: 900 // 60 * 15 = 900 -> 15 min
    })

    res.json({ apiytuser: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar canal" });
  }
}
