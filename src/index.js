import Database from "./config/database.js";
import app from "./app.js";
import config from "./config/config.js";
import { trainerService } from "./services/index.js";

let server;

(async () => {
  try {
    await Database.authenticate();
    await Database.sync({ alter: true });
    console.log("Database is up");

    // Add default user to database
    await trainerService.createDefaultTrainer();
    console.log(config);
    server = app.listen(config.NODE_APP_PORT, () => {
      console.log(`Server is running on port ${config.NODE_APP_PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
