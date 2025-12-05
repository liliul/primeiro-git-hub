import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import qs from "qs";
import dotenv from "dotenv";

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
      scope: "openid email profile",
      prompt: "select_account"
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

    const { id_token } = data;
    const googleUser = JSON.parse(
        Buffer.from(id_token.split(".")[1], "base64").toString()
    );

    console.log("Usuário Google:", googleUser);

    const token = jwt.sign(
        {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            googleId: googleUser.sub,
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: "1d" 
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,   
        sameSite: "lax",
        path: "/"
    });


    return res.redirect("http://localhost:8081/auth-google-test.html");

  } catch (error) {
    console.log("GOOGLE ERROR:", error.response?.data);
    return res.status(400).send(error.response?.data);
  }
})

export default routerGoogleAuth;
