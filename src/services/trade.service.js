import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Trade } from "../models/index.js";

async function createTrade(tradeBody) {
  return Trade.create(tradeBody).catch((error) => {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      throw new ApiError(httpStatus.NOT_FOUND, "Trainer not found");
    }
  });
}

export { createTrade };
