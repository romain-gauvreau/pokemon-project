import { Sequelize } from "sequelize";
import config from "./config.js";

const Database = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USERNAME || "postgres",
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT || 3306,
    dialect: "mysql",
    logging: true,
  }
);

export default Database;
