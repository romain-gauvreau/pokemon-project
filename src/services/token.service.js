import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../config/config.js";
import { Token } from "../models/index.js";
import tokenTypes from "../config/tokens.js";

function generateToken(trainerId, expires, type, secret = config.JWT_SECRET) {
  const payload = {
    sub: trainerId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
}

async function saveToken(token, trainerId, expires, type, blacklisted = false) {
  const tokenDoc = await Token.create({
    token,
    trainerId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
}

async function verifyToken(token, type) {
  const payload = jwt.verify(token, config.JWT_SECRET);
  const tokenDoc = await Token.findOne({
    where: {
      token,
      type,
      trainerId: payload.sub,
      blacklisted: false,
    },
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
}

async function generateAuthTokens(trainer) {
  const accessTokenExpires = moment().add(
    config.JWT_ACCESS_TOKEN_EXPIRATION,
    "minutes"
  );
  const accessToken = generateToken(
    trainer.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.JWT_REFRESH_TOKEN_EXPIRATION,
    "minutes"
  );
  const refreshToken = generateToken(
    trainer.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    trainer.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
}

export { generateToken, saveToken, verifyToken, generateAuthTokens };
