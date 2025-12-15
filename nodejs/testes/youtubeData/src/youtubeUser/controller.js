import axios from "axios";
import { getValidGoogleToken } from "./utils.js";

export async function getMyChannel(req, res) {
  try {
    const googleId = req.user.sub;

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
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar canal" });
  }
}
