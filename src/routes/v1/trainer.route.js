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
  .patch(
    auth("manageTrainers"),
    validate(trainerValidation.updateTrainer),
    trainerController.updateTrainer
  )
  .delete(
    auth("manageTrainers"),
    validate(trainerValidation.deleteTrainer),
    trainerController.deleteTrainer
  );

trainerRouter
  .route("/:trainerId/pokemons")
  .get(
    auth("getTrainers"),
    validate(trainerValidation.getTrainerPokemons),
    trainerController.getTrainerPokemons
  );

trainerRouter
  .route("/:trainerId/trades")
  .get(
    auth("getTrainers"),
    validate(trainerValidation.getTrainerTrades),
    trainerController.getTrainerTrades
  );

export default trainerRouter;

/**
 * @swagger tags:
 *   name: Trainers
 *   description: Trainers management and retrieval
 */

/**
 * @swagger /trainers/{id}:
 *   get:
 *     summary: Get a trainer
 *     description: Fetch trainer information by id
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
 *
 *   patch:
 *     summary: Update a trainer
 *     description: Logged in trainers can only update their own information. Only admins can update other trainers and roles.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthdate:
 *                 type: date
 *             example:
 *               username: login123
 *               password: password1
 *               firstName: John
 *               lastName: Doe
 *               birthdate: 1990-01-01
 *               role: admin
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Trainer'
 *       "400":
 *         $ref: '#/components/responses/DuplicateUsername'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
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
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger /trainers/{id}/pokemons:
 *   get:
 *     summary: Get a trainer's pokemons
 *     description: Fetch trainer's pokemons by trainer id (paginate)
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
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: size
 *         required: true
 *         schema:
 *           type: integer
 *         description: Page size
 *     responses:
 *      "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  totalItems:
 *                    type: integer
 *                    description: Total number of items
 *                  totalPages:
 *                    type: integer
 *                    description: Total number of pages
 *                  currentPage:
 *                    type: integer
 *                    description: Current page number
 *                  pokemons:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Pokemon'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger /trainers/{id}/trades:
 *   get:
 *     summary: Get a trainer's trades
 *     description: Fetch trainer's trades by trainer id
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
 *      "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  trades:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Trade'
 *      "401":
 *        $ref: '#/components/responses/Unauthorized'
 */
