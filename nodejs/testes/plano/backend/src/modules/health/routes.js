import { Router } from "express";
import { pool } from "../../database/postgres.js";
import HealthController from "./healthController.js";

const healthRoutes = Router();

const healthController = new HealthController(pool);
healthRoutes.get("/", healthController.healthCheck.bind(healthController));

export default healthRoutes;
