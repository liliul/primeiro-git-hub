import express from "express";
import { pool } from "../../../database/postgres.js";
import EsqueciSenhaController from "./esqueciSenhaController.js";
import RestaurarSenhaController from "./restaurarSenhaControlle.js";

const resetPassword = express.Router();

const esqueciSenha = new EsqueciSenhaController(pool)
const restaurarSenha = new RestaurarSenhaController(pool)

resetPassword.post("/esqueci-senha", esqueciSenha.forgotPassword.bind(esqueciSenha));
resetPassword.post("/restaurar-senha", restaurarSenha.resetPassword.bind(restaurarSenha));

export default resetPassword;
