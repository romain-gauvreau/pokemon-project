import httpStatus from "http-status";
import config from "../config/config.js";

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.NODE_ENV === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (config.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

export default errorHandler;
