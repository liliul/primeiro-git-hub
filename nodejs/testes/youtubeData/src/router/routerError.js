import express from 'express'
import path from "path"

const routerError = express.Router()
const __dirname = path.resolve()

routerError.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).sendFile(
    path.join(__dirname, "public/views/errors/500.html")
  )
})

routerError.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, "public/views/errors/404.html")
  )
})

export default routerError