import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { trainerService, pokemonService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

const getTrainer = catchAsync(async (req, res) => {
  const trainer = await trainerService.getTrainerById(req.params.trainerId);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
  }
  res.send(trainer);
});

const getTrainerPokemons = catchAsync(async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  await pokemonService
    .getPaginatePokemonsByTrainerId(req.params.trainerId, limit, offset)
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    });
});

const updateTrainer = catchAsync(async (req, res) => {
  const trainer = await trainerService.updateTrainerById(
    req.params.trainerId,
    req.body
  );
  res.send(trainer);
});

const deleteTrainer = catchAsync(async (req, res) => {
  await trainerService.deleteTrainerById(req.params.trainerId);
  res.status(httpStatus.NO_CONTENT).send();
});

export { getTrainer, getTrainerPokemons, deleteTrainer, updateTrainer };
