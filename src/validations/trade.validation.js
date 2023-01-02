import Joi from "joi";

const createTrade = {
  body: Joi.object({
    pokemonId: Joi.number().required(),
    buyerId: Joi.number().required(),
  }),
};

export { createTrade };
