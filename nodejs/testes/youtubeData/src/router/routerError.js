import express from 'express'
import path from "path"

const routerError = express.Router()

routerError.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('errors/500')
})

routerError.use((req, res) => {
  res.status(404).render('errors/404')
})

export default routerError