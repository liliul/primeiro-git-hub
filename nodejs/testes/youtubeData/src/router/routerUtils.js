import express from "express";
import path from "path";
import authRequirida from "../middleware/autenticandoRotas.js";

const routerUtils = express.Router();
const __dirname = path.resolve();

routerUtils.get("/", (req, res) => {
  res.render('index');
})
routerUtils.get("/home", (req, res) => {
  res.render("layouts/home")
})
routerUtils.get("/salvando-videos-alta", (req, res) => {
  res.render("pages/salvando-videos-alta")
})
routerUtils.get("/playlists", (req, res) => {
  res.render("pages/playlists")
})
routerUtils.get("/listar-videos-alta", (req, res) => {
  res.render("pages/listar-videos-alta")
})
routerUtils.get("/atividades-youtube", (req, res) => {
  res.render("pages/atividades-youtube")
})
routerUtils.get("/buscar-videos-alta-uf", (req, res) => {
  res.render("pages/buscar-videos-alta-uf")
})
routerUtils.get("/info-channel", (req, res) => {
  res.render("pages/info-channel")
})
routerUtils.get("/pesquisa-videos-youtube", (req, res) => {
  res.render("pages/pesquisa-videos-youtube")
})

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
