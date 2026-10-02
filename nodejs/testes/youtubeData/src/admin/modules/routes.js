import express from "express";
import routerUsers from "./users/routes.js";

const adminModulesRoutes = express();

adminModulesRoutes.use(routerUsers);

export default adminModulesRoutes;