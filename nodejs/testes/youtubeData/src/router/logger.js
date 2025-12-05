import express from "express";
import path from "path";
import authRequirida from "../middleware/autenticandoRotas.js";

const routerLogger = express.Router();
const __dirname = path.resolve();

routerLogger.get("/home", authRequirida, (req, res) => {
  res.sendFile(path.join(__dirname, "public/views/home.html"));
});

export default routerLogger;