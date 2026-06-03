import express from "express";
import { pool } from "../../../database/postgres.js";
import {
	publicRateLimit,
	resetPasswordRateLimit,
} from "../../../middlewares/rateLimit/rateLimit.js";
import EsqueciSenhaController from "./esqueciSenhaController.js";
import RestaurarSenhaController from "./restaurarSenhaControlle.js";
import path from "node:path";

const __dirname = path.resolve();

const resetPassword = express.Router();

const esqueciSenha = new EsqueciSenhaController(pool);
const restaurarSenha = new RestaurarSenhaController(pool);

resetPassword.post(
	"/esqueci-senha",
	publicRateLimit("Esqueci senha"),
	esqueciSenha.forgotPassword,
);

resetPassword.post(
	"/restaurar-senha",
	resetPasswordRateLimit("Restaurar senha"),
	restaurarSenha.resetPassword,
);

resetPassword.get(
	"/restaurar-senha",
	resetPasswordRateLimit("Alterando senha"),
	(req, res) => {
		res.sendFile(path.join(__dirname, "public/restaurarSenha.html"));
	},
);

export default resetPassword;
