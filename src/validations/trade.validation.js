import Joi from "joi";

const createTrade = {
  body: Joi.object({
    pokemonId: Joi.number().required(),
    buyerId: Joi.number().required(),
  }),
};

const updateTradeStatus = {
  params: Joi.object({
    tradeId: Joi.string().required(),
  }),
  body: Joi.object({
    status: Joi.string().required().equal("pending", "accepted", "rejected"),
  }),
};

export { createTrade, updateTradeStatus };
