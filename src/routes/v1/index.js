import { Router } from "express";
import apiDocsRouter from "./api-docs.route.js";
import trainerRouter from "./trainer.route.js";

const routes = Router();

routes.use("/api-docs", apiDocsRouter);
routes.use("/trainers", trainerRouter);

export default routes;
