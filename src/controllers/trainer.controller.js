import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { trainerService } from "../services/index.js";
import ApiError from "../utils/ApiError.js";

const getTrainer = catchAsync(async (req, res) => {
  const trainer = await trainerService.getTrainerById(req.params.trainerId);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
  }
  res.send(trainer);
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

export { getTrainer, deleteTrainer, updateTrainer };
