import { Router } from "express";
import apiDocsRouter from "./api-docs.route.js";
import trainerRouter from "./trainer.route.js";
import authRouter from "./auth.route.js";
import pokemonRouter from "./pokemon.route.js";
import tradeRouter from "./trade.route.js";

const routes = Router();

routes.use("/api-docs", apiDocsRouter);
routes.use("/auth", authRouter);
routes.use("/trainers", trainerRouter);
routes.use("/pokemons", pokemonRouter);
routes.use("/trades", tradeRouter);

export default routes;
