import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import {
  authService,
  tokenService,
  trainerService,
} from "../services/index.js";

const register = catchAsync(async (req, res) => {
  const trainer = await trainerService.createTrainer(req.body);
  const tokens = await tokenService.generateAuthTokens(trainer);
  res.status(httpStatus.CREATED).send({ trainer, tokens });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const trainer = await authService.loginTrainerWithUsernameAndPassword(
    username,
    password
  );
  const tokens = await tokenService.generateAuthTokens(trainer);
  res.send({ trainer, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export { login, logout, refreshTokens, register };
