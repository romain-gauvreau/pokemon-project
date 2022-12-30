import config from "../config/config.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Pokemon Project",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:${config.NODE_APP_PORT}/v1`,
    },
  ],
};

export default swaggerDefinition;
