import httpStatus from "http-status";
import { Op } from "sequelize";
import ApiError from "../utils/ApiError.js";
import { Trade } from "../models/index.js";

async function createTrade(tradeBody) {
  return Trade.create(tradeBody).catch((error) => {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
    }
  });
}

async function getTradeById(tradeId) {
  return Trade.findByPk(tradeId);
}

async function getTradesByTrainerId(trainerId) {
  return Trade.findAll({
    where: { [Op.or]: [{ buyerId: trainerId }, { sellerId: trainerId }] },
  });
}

export { createTrade, getTradeById, getTradesByTrainerId };
