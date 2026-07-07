import express from 'express'
import cron from 'node-cron'

import EventsController from './eventsController.js'
import EventsService from './eventsService.js'
import EventsRepository from './eventsRepository.js'
import sseManager from '../utils/sseManager.js'

const eventsRouter = express.Router()

const eventsRepository = new EventsRepository()
const eventsService = new EventsService(eventsRepository, sseManager)
const eventsController = new EventsController(sseManager)

eventsRouter.get('/events', eventsController.notifyVideosAlta)

const cacheKey = `youtube:alta:countVideos`

cron.schedule("*/10 * * * * *", async () => {
    try {
        await eventsService.checkNotifyVideosAlta()
    } catch (error) {
        console.error(error);
    }
})

export default eventsRouter