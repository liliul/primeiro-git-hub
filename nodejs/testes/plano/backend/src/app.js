import express from "express";
import ErrorGlobal from "./middlewares/err/errorHandler.js";
import authRefresToken from "./modules/auth/routes.js";
import healthRoutes from "./modules/health/routes.js";
import userRoutes from "./modules/users/routes.js";

const app = express();

const errorGlobal = new ErrorGlobal();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRefresToken);
app.use(errorGlobal.errorHandler);

export default app;
