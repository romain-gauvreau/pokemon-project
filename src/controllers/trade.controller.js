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

const updateTradeStatus = catchAsync(async (req, res) => {
  const trade = await tradeService.getTradeById(req.params.tradeId);
  if (!trade) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trade not found");
  } else if (trade.buyerId !== req.user.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You can't update a trade status that is not proposed to you"
    );
  } else if (trade.status !== "pending") {
    throw new ApiError(httpStatus.FORBIDDEN, "Trade already accepted/rejected");
  }
  Object.assign(trade, req.body);
  await trade.save();
  if (trade.status === "accepted") {
    await pokemonService.updatePokemonById(trade.pokemonId, {
      trainerId: trade.buyerId,
    });
  }
  res.send(trade);
});

export { createTrade, updateTradeStatus };
