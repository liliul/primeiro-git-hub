import express from "express";
import EmailVerifiedController from "./emailVerifiedController.js";
import { pool } from "../../../database/postgres.js";

const emailVerifiedRoutes = express.Router();

const emailVerifiedController = new EmailVerifiedController(pool);

emailVerifiedRoutes.get(
	"/email-verified",
	emailVerifiedController.emailVerifield,
);

// emailVerifiedRoutes.get(
// 	"/resend-verification",
// 	(req, res) => {
// 		res.sendFile(path.join(__dirname, "public/reenvioConfirmarEmail.html"));
// 	},
// );

// emailVerifiedRoutes.post("/email-verified", emailVerifiedController.emailVerifield)
emailVerifiedRoutes.post(
	"/resend-verification",
	emailVerifiedController.resendVerification,
);

export default emailVerifiedRoutes;
