import express from "express";
import path from "path";
import authRequirida from "../middleware/autenticandoRotas.js";

const routerUtils = express.Router();
const __dirname = path.resolve();

routerUtils.get("/", (req, res) => {
  res.render('index.html');
})
routerUtils.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views" , "home.html"));
});

routerUtils.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
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
