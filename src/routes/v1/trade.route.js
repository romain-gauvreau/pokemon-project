import { Router } from "express";
import { tradeValidation } from "../../validations/index.js";
import { tradeController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";

const tradeRouter = Router();

tradeRouter
  .route("/")
  .post(
    auth("manageTrades"),
    validate(tradeValidation.createTrade),
    tradeController.createTrade
  );

export default tradeRouter;

/**
 * @swagger
 * tags:
 *   name: Trades
 *   description: Pokemon trades management
 */

/**
 * @swagger
 * /trades:
 *   post:
 *     summary: Create a trade
 *     description: Logged in trainers can create a trade to propose to send one of their pokemons to another trainer.
 *     tags: [Trades]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: trues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pokemonId
 *               - sellerId
 *             properties:
 *               pokemonId:
 *                 type: integer
 *               buyerId:
 *                 type: integer
 *             example:
 *               pokemonId: 10
 *               buyerId: 4
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Trade'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
