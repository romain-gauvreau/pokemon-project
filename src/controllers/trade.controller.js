import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { pokemonService, tradeService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";

const createTrade = catchAsync(async (req, res) => {
  const pokemon = await pokemonService.getPokemonById(req.body.pokemonId);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pokemon not found");
  } else if (pokemon.trainerId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "Pokemon not owned by user");
  }
  req.body.sellerId = req.user.id;
  const trade = await tradeService.createTrade(req.body);
  res.status(httpStatus.CREATED).send(trade);
});

export { createTrade };
