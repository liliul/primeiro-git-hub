import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import db from "../db/conection_db.js"

dotenv.config()

import GoogleOauthController from "./googleOauthController.js"
import GoogleOauthService from "./googleOauthService.js"
import GoogleOauthRepository from "./googleOauthRepository.js"

import UtilsAdapter from "./utilsAdapter.js"

const routerGoogleOauth2 = express.Router()

routerGoogleOauth2.use(cookieParser())

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = "http://localhost:3001/auth/google/callback"

const utilsAdapter = new UtilsAdapter({CLIENT_ID, CLIENT_SECRET, REDIRECT_URI})
const googleOauthRepository = new GoogleOauthRepository(db)
const googleOauthService = new GoogleOauthService(utilsAdapter, googleOauthRepository)
const googleOauthController = new GoogleOauthController(googleOauthService)

routerGoogleOauth2.get('/google', googleOauthController.google)
routerGoogleOauth2.get('/google/callback', googleOauthController.googleCallback)

export default routerGoogleOauth2