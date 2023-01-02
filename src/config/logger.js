import moment from "moment";
import { Log } from "../models/index.js";

function logger(req, res, next) {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const responseTime = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
    const { statusCode } = res;
    const { method } = req;
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const route = req.originalUrl;

    console.log(
      `[${date}]: ${method} ${route} ${responseTime}ms (${statusCode})`
    );
    Log.create({ date, route, method, statusCode, responseTime });
  });

  next();
}

export default logger;
