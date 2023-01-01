import httpStatus from "http-status";
import { Trainer } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

async function getTrainerById(id) {
  return Trainer.findByPk(id, { attributes: { exclude: ["password"] } });
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
export {
  getTrainerById,
  deleteTrainerById,
  getTrainerByUsername,
  createDefaultTrainer,
  createTrainer,
};
