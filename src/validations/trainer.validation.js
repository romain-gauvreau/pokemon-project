import Joi from "joi";

const getTrainer = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
};

const getTrainerPokemons = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
  query: Joi.object({
    page: Joi.number().required(),
    size: Joi.number().required(),
  }),
};

const getTrainerTrades = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
};

const updateTrainer = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string(),
    birthdate: Joi.date(),
  }),
};

const deleteTrainer = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
};

export {
  getTrainer,
  getTrainerPokemons,
  getTrainerTrades,
  updateTrainer,
  deleteTrainer,
};
