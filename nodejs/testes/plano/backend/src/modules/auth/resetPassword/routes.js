import express from "express";
import { pool } from "../../../database/postgres.js";
import { publicRateLimit } from "../../../middlewares/rateLimit/rateLimit.js";
import EsqueciSenhaController from "./esqueciSenhaController.js";
import RestaurarSenhaController from "./restaurarSenhaControlle.js";

const resetPassword = express.Router();

const esqueciSenha = new EsqueciSenhaController(pool);
const restaurarSenha = new RestaurarSenhaController(pool);

resetPassword.post(
	"/esqueci-senha",
	publicRateLimit("esqueci senha"),
	esqueciSenha.forgotPassword.bind(esqueciSenha),
);

resetPassword.post(
	"/restaurar-senha",
	publicRateLimit("restaurar senha"),
	restaurarSenha.resetPassword.bind(restaurarSenha),
);

resetPassword.get(
	"/restaurar-senha",
	publicRateLimit("alterando senha"),
	(req, res) => {
		const { token } = req.query;

		res.send(`
    <form method="POST" action="/auth/restaurar-senha">
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="newPassword" placeholder="Nova senha" />
      <button type="submit">Redefinir</button>
    </form>
  `);
	},
);

export default resetPassword;
