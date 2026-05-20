import express from "express";
import { pool } from "../../database/postgres.js";
import { AppError } from "../../errors/appErrors/index.js";
import AuthRoutesJwt from "../../middlewares/jwt/authRoutesJwt.js";
import AssinaturasController from "./controller/assinaturasController.js";

const planoRouter = express.Router();
const JWT = new AuthRoutesJwt();

const assinaturas = new AssinaturasController(pool);

planoRouter.post("/create", JWT.auth, assinaturas.criandoAssinatura);

planoRouter.get("/info", JWT.auth, JWT.garantirPlano("pro"), (req, res) => {
	const { roles, plano, permissions } = req.user;

	const data = {
		roles,
		plano,
		permissions,
	};

	res.json({ message: "rota info autorizada", data: data });
});

export default planoRouter;
