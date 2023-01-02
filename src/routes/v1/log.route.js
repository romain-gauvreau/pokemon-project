import { Router } from "express";
import { logController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";

const logRouter = Router();

logRouter.route("/").get(auth("downloadLogs"), logController.getAllLogsInCsv);

export default logRouter;

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Logs retrieval
 */

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get all logs in csv
 *     description: Fetch all logs in csv. Only admins can access this route.
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/csv:
 *             schema:
 *               format: binary
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
