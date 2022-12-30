import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerDefinition from "../../docs/swaggerDefinition.js";

const apiDocsRouter = Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/*.yml", "src/routes/v1/*.js"],
});

apiDocsRouter.use("/", swaggerUi.serve);
apiDocsRouter.get("/", swaggerUi.setup(specs));

export default apiDocsRouter;
