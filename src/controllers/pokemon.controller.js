import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { pokemonService, trainerService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";

const getPokemon = catchAsync(async (req, res) => {
  const pokemon = await pokemonService.getPokemonById(req.params.pokemonId);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pokemon not found");
  }
  res.send(pokemon);
});

const createPokemon = catchAsync(async (req, res) => {
  const pokemon = await pokemonService.createPokemon(req.body);
  res.status(httpStatus.CREATED).send(pokemon);
});

const updatePokemon = catchAsync(async (req, res) => {
  const trainer = await trainerService.getTrainerById(req.user.id);
  const pokemonDoc = await pokemonService.getPokemonById(req.params.pokemonId);

  // Check if the trainer owns the pokemon
  if (trainer.role !== "admin" && trainer.id !== pokemonDoc.trainerId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }

  const pokemon = await pokemonService.updatePokemonById(
    req.params.pokemonId,
    req.body
  );
  res.send(pokemon);
});

const deletePokemon = catchAsync(async (req, res) => {
  const trainer = await trainerService.getTrainerById(req.user.id);
  const pokemon = await pokemonService.getPokemonById(req.params.pokemonId);

  // Check if the trainer owns the pokemon
  if (trainer.role !== "admin" && trainer.id !== pokemon.trainerId) {
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
  }
  await pokemonService.deletePokemonById(req.params.pokemonId);
  res.status(httpStatus.NO_CONTENT).send();
});

export { createPokemon, getPokemon, updatePokemon, deletePokemon };
