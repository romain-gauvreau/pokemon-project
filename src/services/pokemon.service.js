import httpStatus from "http-status";
import { Pokemon } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

async function getAllPokemons() {
  return Pokemon.findAll();
}

async function getPokemonById(id) {
  return Pokemon.findByPk(id);
}

async function createPokemon(pokemonBody) {
  return Pokemon.create(pokemonBody).catch((error) => {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Trainer not found");
    }
  });
}

async function updatePokemonById(id, updateBody) {
  const pokemon = await getPokemonById(id);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pokemon not found");
  }
  Object.assign(pokemon, updateBody);
  await pokemon.save();
  return pokemon;
}

async function deletePokemonById(id) {
  return Pokemon.destroy({ where: { id } });
}

export {
  getAllPokemons,
  createPokemon,
  getPokemonById,
  deletePokemonById,
  updatePokemonById,
};
