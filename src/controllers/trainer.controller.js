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

export { getTrainer };
