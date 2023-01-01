import httpStatus from "http-status";
import { Trainer } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

async function getTrainerById(id, excludePassword = true) {
  return excludePassword
    ? Trainer.findByPk(id, { attributes: { exclude: ["password"] } })
    : Trainer.findByPk(id);
}

async function deleteTrainerById(id) {
  return Trainer.destroy({ where: { id } });
}

async function getTrainerByUsername(username) {
  return Trainer.findOne({ where: { username } });
}

async function createDefaultTrainer() {
  const trainer = await getTrainerByUsername("leopkmn");
  if (!trainer) {
    await Trainer.create({
      firstName: "Léo",
      lastName: "Pokemaniac",
      username: "leopkmn",
      password: "cynthia",
      birthdate: new Date("1999-10-08"),
      role: "admin",
    });
  }
}

async function createTrainer(trainerBody) {
  const isUsernameTaken = await getTrainerByUsername(trainerBody.username);
  if (isUsernameTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
  }
  return Trainer.create(trainerBody);
}

async function updateTrainerById(id, updateBody) {
  const trainer = await getTrainerById(id, false);
  if (!trainer) {
    throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
  }

  // Avoid non admin users to update their role
  if (trainer.role !== "admin") {
    // eslint-disable-next-line no-param-reassign
    delete updateBody.role;
  }

  if (updateBody.username) {
    const isUsernameTaken = await getTrainerByUsername(updateBody.username);
    if (isUsernameTaken && isUsernameTaken.id !== id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Username already taken");
    }
  }

  Object.assign(trainer, updateBody);

  await trainer.save();
  return trainer;
}
export {
  getTrainerById,
  deleteTrainerById,
  getTrainerByUsername,
  createDefaultTrainer,
  createTrainer,
  updateTrainerById,
};
