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

tradeRouter
  .route("/:tradeId/status")
  .patch(
    auth("manageTrades"),
    validate(tradeValidation.updateTradeStatus),
    tradeController.updateTradeStatus
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

/**
 * @swagger
 * /trades/{id}/status:
 *   patch:
 *     summary: Accept or reject a trade
 *     description: Logged in trainers can accept or reject a trade only if they are involved in it.
 *     tags: [Trades]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trade id
 *     requestBody:
 *       required: trues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, rejected, pending]
 *             example:
 *               status: accepted
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Trade'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
