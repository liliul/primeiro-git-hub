import axios from "axios";
import qs from "qs";
import db from "../db/conection_db.js";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export async function getValidGoogleToken(googleId) {
  const { rows } = await db.query(
    "SELECT * FROM google_oauth_tokens WHERE google_id = $1",
    [googleId]
  );

  const token = rows[0];
  if (!token) throw new Error("Token não encontrado");

  if (new Date(token.expires_at) > new Date()) {
    return token.access_token;
  }

  const refreshResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const newAccessToken = refreshResponse.data.access_token;
  const expiresAt = new Date(
    Date.now() + refreshResponse.data.expires_in * 1000
  );

  await db.query(
    `
    UPDATE google_oauth_tokens
    SET access_token = $1,
        expires_at = $2,
        updated_at = NOW()
    WHERE google_id = $3
    `,
    [newAccessToken, expiresAt, googleId]
  );

  return newAccessToken;
}
