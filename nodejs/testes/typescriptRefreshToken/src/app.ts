import express from "express";
import dotenv from "dotenv";
import authRoutes from "./router/auth.routes";
import userRoutes from "./router/test.routes";

import cors from "cors"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8081", 
    credentials: true,
  }))
app.use("/auth", authRoutes);
app.use("/user/", userRoutes)

export default app;
