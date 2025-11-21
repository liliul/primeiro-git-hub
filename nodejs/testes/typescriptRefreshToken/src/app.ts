import express from "express";
import dotenv from "dotenv";
import authRoutes from "./router/auth.routes";
import userRoutes from "./router/test.routes";

import cors from "cors"
import { swaggerSpec, swaggerUiMiddleware } from "./docs/swagger";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8081", 
    credentials: true,
  }))

app.use("/docs", swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/user/", userRoutes)

export default app;
