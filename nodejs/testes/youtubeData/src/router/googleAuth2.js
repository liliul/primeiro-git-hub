import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import qs from "qs";
import dotenv from "dotenv";
import db from '../db/conection_db.js';

dotenv.config();

const routerGoogleAuth = express.Router();

routerGoogleAuth.use(cookieParser());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3001/auth/google/callback";

routerGoogleAuth.get("/google", (req, res) => {
  const googleAuthURL =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube.readonly"
      ].join(" "),
      access_type: "offline",
      prompt: "consent"
    })

  res.redirect(googleAuthURL);
})

routerGoogleAuth.get("/google/callback", async (req, res) => {
  try {
    const code = req.query.code;
   
    const body = qs.stringify({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
    })

    const { data } = await axios.post(
    "https://oauth2.googleapis.com/token",
    body,
    {
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
    }
    )

    const {
      access_token,
      refresh_token,
      expires_in,
      id_token
    } = data;

    const googleUser = JSON.parse(
        Buffer.from(id_token.split(".")[1], "base64").toString()
    );

    console.log("Usuário Google:", googleUser);

    const expiresAt = new Date(Date.now() + expires_in * 1000);

    await db.query(
      `
      INSERT INTO google_oauth_tokens
        (google_id, email, access_token, refresh_token, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (google_id)
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = COALESCE(EXCLUDED.refresh_token, google_oauth_tokens.refresh_token),
        expires_at = EXCLUDED.expires_at,
        updated_at = NOW();
      `,
      [
        googleUser.sub,
        googleUser.email,
        access_token,
        refresh_token,
        expiresAt,
      ]
    );

    const token = jwt.sign(
        {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            googleId: googleUser.sub,
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: "1d",
            issuer: "my-video-you",
            audience: "my-video-you-web",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,   
        sameSite: "lax",
        path: "/"
    });


    return res.redirect("/v3/home");

  } catch (error) {
    console.log("GOOGLE ERROR:", error.response?.data);
    return res.status(400).send(error.response?.data);
  }
})

export default routerGoogleAuth;
