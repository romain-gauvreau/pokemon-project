import { Trainer } from "../models/index.js";

async function getTrainerById(id) {
  return Trainer.findByPk(id);
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
export { getTrainerById, getTrainerByUsername, createDefaultTrainer };
