import { Strategy, ExtractJwt } from "passport-jwt";
import tokenTypes from "./tokens.js";
import config from "./config.js";
import { Trainer } from "../models/index.js";

const jwtOptions = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const trainer = await Trainer.findByPk(payload.sub);
    if (!trainer) {
      return done(null, false);
    }
    done(null, trainer);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export default jwtStrategy;
