import cookieParser from "cookie-parser";
import express from "express";
import { pool } from "./database/postgres.js";
import CronAgendamentos from "./jobs/limpandoRefreshTokenExpirados.js";
import { corsMiddleware } from "./middlewares/cors/index.js";
import ErrorGlobal from "./middlewares/err/errorHandler.js";
import requestGlobal from "./middlewares/loggerGlobal/request.js";
import superAdminRoutes from "./modules/admins/superAdmin/routes/routes.js";
import authRefresToken from "./modules/auth/refreshToken/routes.js";
import userRoutes from "./modules/auth/users/routes.js";
import healthRoutes from "./modules/health/routes.js";

const cronAgendamentos = new CronAgendamentos(pool);
cronAgendamentos.limpandoRefreshTokenExpirados();

const app = express();

const errorGlobal = new ErrorGlobal();

app.set("trust proxy", 1);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(requestGlobal);

app.use("/health", healthRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRefresToken);
app.use("/superadmin", superAdminRoutes);

app.use(errorGlobal.errorHandler);

export default app;
