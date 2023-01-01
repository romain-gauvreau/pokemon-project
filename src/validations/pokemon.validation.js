import Joi from "joi";

const createPokemon = {
  body: Joi.object({
    species: Joi.string().required(),
    name: Joi.string(),
    level: Joi.number().required(),
    gender: Joi.string(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    isChromatic: Joi.boolean(),
    trainerId: Joi.number().required(),
  }),
};

const getPokemon = {
  params: Joi.object({
    pokemonId: Joi.string().required(),
  }),
};

const updatePokemon = {
  params: Joi.object({
    pokemonId: Joi.string().required(),
  }),
  body: Joi.object({
    species: Joi.string(),
    name: Joi.string(),
    level: Joi.number(),
    gender: Joi.string(),
    height: Joi.number(),
    weight: Joi.number(),
    isChromatic: Joi.boolean(),
    trainerId: Joi.number(),
  }),
};

const deletePokemon = {
  params: Joi.object({
    pokemonId: Joi.string().required(),
  }),
};

export { createPokemon, getPokemon, deletePokemon, updatePokemon };
