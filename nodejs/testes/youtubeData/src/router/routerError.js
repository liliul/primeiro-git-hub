import express from 'express'

const routerError = express.Router()

routerError.use((req, res) => {
  res.status(404).sendFile(
    path.join(__dirname, "views", "errors", "404.html")
  );
});

routerError.use((err, req, res, next) => {
  console.error(err);
  res.status(500).sendFile(
    path.join(__dirname, "views", "errors", "500.html")
  );
});

export default routerError