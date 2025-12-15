import express from "express";
import path from "path";
import authRequirida from "../middleware/autenticandoRotas.js";

const routerLogger = express.Router();
const __dirname = path.resolve();

routerLogger.get("/home", authRequirida, (req, res) => {
  console.log('user: ', req.user)
  res.sendFile(path.join(__dirname, "public/views/home.html"));
});

routerLogger.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

routerLogger.get("/me", authRequirida, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user,
  });
});

export default routerLogger;
