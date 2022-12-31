import { Trainer } from "../models/index.js";

async function getTrainerById(id) {
  return Trainer.findByPk(id);
}
async function getTrainerByLogin(login) {
  return Trainer.findOne({ where: { login } });
}

async function createDefaultUser() {
  const trainer = await getTrainerByLogin("leopkmn");
  console.log(trainer);
  if (!trainer) {
    await Trainer.create({
      firstName: "Léo",
      lastName: "Pokemaniac",
      login: "leopkmn",
      password: "cynthia",
      birthdate: new Date("1999-10-08"),
      role: "admin",
    });
  }
}
export { getTrainerById, getTrainerByLogin, createDefaultUser };
