import express from "express";
import { trainerController } from "../../controllers/index.js";

const trainerRouter = express.Router();

trainerRouter.route("/:trainerId").get(trainerController.getTrainer);

export default trainerRouter;

/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Get a trainer
 *     description: Fetch trainer information by id
 *     tags: [Trainers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trainer id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Trainer'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
