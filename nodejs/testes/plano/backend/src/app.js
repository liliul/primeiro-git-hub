import express from "express";
import ErrorGlobal from "./middlewares/err/errorHandler.js";
import healthRoutes from "./modules/health/routes.js";
import userRoutes from "./modules/users/routes.js";

const app = express();

const errorGlobal = new ErrorGlobal();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", userRoutes);
app.use(errorGlobal.errorHandler);

export default app;
