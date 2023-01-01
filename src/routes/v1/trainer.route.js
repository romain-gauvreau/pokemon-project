import express from "express";
import { trainerController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import { trainerValidation } from "../../validations/index.js";

const trainerRouter = express.Router();

trainerRouter
  .route("/:trainerId")
  .get(
    auth("getTrainers"),
    validate(trainerValidation.getTrainer),
    trainerController.getTrainer
  )
  .delete(
    auth("manageTrainers"),
    validate(trainerValidation.deleteTrainer),
    trainerController.deleteTrainer
  );

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
 *     security:
 *       - bearerAuth: []
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
 *   delete:
 *     summary: Delete a trainer
 *     description: Logged in trainers can delete only themselves. Only admins can delete other trainers.
 *     tags: [Trainers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trainer id
 *     responses:
 *       "204":
 *         description: No content
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
