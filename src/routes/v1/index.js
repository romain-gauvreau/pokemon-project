import { Router } from "express";
import apiDocsRouter from "./api-docs.route.js";

const routes = Router();

routes.use("/api-docs", apiDocsRouter);

export default routes;
