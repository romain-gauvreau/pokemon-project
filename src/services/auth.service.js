import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import * as trainerService from "./trainer.service.js";
import tokenTypes from "../config/tokens.js";
import { Token } from "../models/index.js";
import * as tokenService from "./token.service.js";

async function loginTrainerWithUsernameAndPassword(login, password) {
  const trainer = await trainerService.getTrainerByUsername(login);
  if (!trainer || !(await trainer.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect login or password");
  }
  return trainer;
}

async function logout(refreshToken) {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.destroy();
}

async function refreshAuth(refreshToken) {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const trainer = await trainerService.getTrainerById(
      refreshTokenDoc.trainerId
    );
    if (!trainer) {
      throw new Error();
    }
    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(trainer);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
}

export { loginTrainerWithUsernameAndPassword, logout, refreshAuth };
