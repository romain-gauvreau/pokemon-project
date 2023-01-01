import Joi from "joi";

const getTrainer = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
};

const deleteTrainer = {
  params: Joi.object({
    trainerId: Joi.string().required(),
  }),
};

export { getTrainer, deleteTrainer };
