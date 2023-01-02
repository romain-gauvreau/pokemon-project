import dotenv from "dotenv";
import path from "path";

const envFileName =
  process.env.NODE_ENV === "production"
    ? ".env"
    : `.env.${process.env.NODE_ENV}`;
dotenv.config({
  path: path.resolve(".", envFileName),
});

const config = {
  NODE_ENV: process.env.NODE_ENV,
  NODE_APP_PORT: process.env.NODE_APP_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
};

export default config;
