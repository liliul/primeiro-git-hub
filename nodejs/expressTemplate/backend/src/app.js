import cookieParser from "cookie-parser";
import express from "express";
import { corsMiddleware } from "./configs/cors.js";
import { helmetConfig } from "./configs/helmet.js";
import { pool } from "./database/postgres.js";
import CronAgendamentos from "./jobs/cronTabAgendamentos.js";
import logger from "./logger/pino.js";
import ErrorGlobal from "./middlewares/err/errorHandler.js";
import requestGlobal from "./middlewares/loggerGlobal/request.js";
import superAdminRoutes from "./modules/admins/superAdmin/routes/routes.js";
import authRefresToken from "./modules/auth/refreshToken/routes.js";
import resetPassword from "./modules/auth/resetPassword/routes.js";
import userRoutes from "./modules/auth/users/routes.js";
import healthRoutes from "./modules/health/routes.js";

const cronAgendamentos = new CronAgendamentos(pool, logger);
cronAgendamentos.limpandoRefreshTokenExpirados();
cronAgendamentos.limpandoTokensExpiradosEsqueceuSenha();

const app = express();

const errorGlobal = new ErrorGlobal();

app.set("trust proxy", 1);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(helmetConfig);
app.use(express.urlencoded({ extended: true }));
app.use(requestGlobal);

app.use("/health", healthRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRefresToken);
app.use("/superadmin", superAdminRoutes);
app.use("/auth", resetPassword);

app.use(errorGlobal.errorHandler);

export default app;
