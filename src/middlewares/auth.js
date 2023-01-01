import httpStatus from "http-status";
import passport from "passport";
import ApiError from "../utils/ApiError.js";
import { roleRights } from "../config/roles.js";

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, trainer, info) => {
    if (err || info || !trainer) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = trainer;

    if (requiredRights.length) {
      const userRights = roleRights.get(trainer.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      // If the user does not have the required rights, they can only access their own account.
      if (!hasRequiredRights && Number(req.params.trainerId) !== trainer.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
