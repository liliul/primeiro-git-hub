import express from "express";
import { userRoutes } from "./modules/user/user.routes";
import { healthRoutes } from "./routes/health.routes";

export const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/auth", userRoutes);
