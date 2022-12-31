import Trainer from "../models/trainer.js";

export default function getTrainerById(id) {
  return Trainer.findByPk(id);
}
