import express from "express";
import path from "path";
import authRequirida from "../middleware/autenticandoRotas.js";

const routerUtils = express.Router();
const __dirname = path.resolve();

routerUtils.get("/home", authRequirida, (req, res) => {
  console.log('user: ', req.user)
  res.sendFile(path.join(__dirname, "public/views/home.html"));
});

routerUtils.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

routerUtils.get("/me", authRequirida, (req, res) => {
  return res.json({
    authenticated: true,
    user: req.user,
  });
});

routerUtils.get("/error", (req, res, next) => {
  next(new Error("Erro de teste"));
});

export default routerUtils;
