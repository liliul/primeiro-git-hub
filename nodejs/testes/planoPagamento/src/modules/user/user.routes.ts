import { Router } from "express";
import { pool } from "../../database";
import { UserController } from "./user.controller";
import { RefreshController } from "./user.refresh";

const userController = new UserController(pool);
const userRefresh = new RefreshController(pool);

export const userRoutes = Router();

userRoutes.post("/", (req, res) => userController.createUser(req, res));
userRoutes.post("/login", (req, res) => userController.login(req, res));
userRoutes.post("/refresh", (req, res) => userRefresh.refresh(req, res));
