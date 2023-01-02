import express from "express";
import httpStatus from "http-status";
import passport from "passport";
import routes from "./routes/v1/index.js";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./middlewares/error.js";
import jwtStrategy from "./config/passport.js";
import logger from "./config/logger.js";

const app = express();

app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// logger
app.use(logger);

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.get("/", (req, res) => res.send("🏠"));

// handle error
app.use(errorHandler);

export default app;
