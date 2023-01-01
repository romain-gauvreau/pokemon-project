import { Router } from "express";
import auth from "../../middlewares/auth.js";
import { pokemonController } from "../../controllers/index.js";
import validate from "../../middlewares/validate.js";
import { pokemonValidation } from "../../validations/index.js";

const pokemonRouter = Router();

pokemonRouter
  .route("/")
  .post(
    auth("managePokemons"),
    validate(pokemonValidation.createPokemon),
    pokemonController.createPokemon
  );

pokemonRouter
  .route("/:pokemonId")
  .get(
    auth("getPokemons"),
    validate(pokemonValidation.getPokemon),
    pokemonController.getPokemon
  )
  .patch(
    auth("managePokemons"),
    validate(pokemonValidation.updatePokemon),
    pokemonController.updatePokemon
  )
  .delete(
    auth("managePokemons"),
    validate(pokemonValidation.deletePokemon),
    pokemonController.deletePokemon
  );

export default pokemonRouter;

/**
 * @swagger
 * tags:
 *   name: Pokemons
 *   description: Pokemon management and retrieval
 */

/**
 * @swagger
 * /pokemons:
 *   post:
 *     summary: Create a pokemon
 *     tags: [Pokemons]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: trues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - species
 *               - name
 *               - level
 *               - gender
 *               - height
 *               - weight
 *               - isChromatic
 *               - trainerId
 *             properties:
 *               species:
 *                 type: string
 *               name:
 *                 type: string
 *               level:
 *                 type: integer
 *               gender:
 *                 type: string
 *               height:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               isChromatic:
 *                 type: boolean
 *               trainerId:
 *                type: string
 *             example:
 *               species: Pikachu
 *               name: Pikachu_Lvl_100
 *               level: 100
 *               gender: unknown
 *               height: 40
 *               weight: 60
 *               isChromatic: true
 *               trainerId: 126
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Pokemon'
 *       "400":
 *         $ref: '#/components/responses/TrainerNotFound'
 */

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Get a pokemon
 *     description: Fetch pokemon information by id
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pokemon id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pokemon'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a pokemon
 *     description: Logged in trainers can only update their own pokemons. Only admins can update others pokemons.
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pokemon id
 *     requestBody:
 *       required: trues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - species
 *               - name
 *               - level
 *               - gender
 *               - height
 *               - weight
 *               - isChromatic
 *               - trainerId
 *             properties:
 *               species:
 *                 type: string
 *               name:
 *                 type: string
 *               level:
 *                 type: integer
 *               gender:
 *                 type: string
 *               height:
 *                 type: integer
 *               weight:
 *                 type: integer
 *               isChromatic:
 *                 type: boolean
 *               trainerId:
 *                type: string
 *             example:
 *               species: Pikachu
 *               name: Pikachu_Lvl_100
 *               level: 100
 *               gender: unknown
 *               height: 40
 *               weight: 60
 *               isChromatic: true
 *               trainerId: 126
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Pokemon'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a pokemon
 *     description: Logged in trainers can only delete their pokemons. Only admins can delete all the pokemons.
 *     tags: [Pokemons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pokemon id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
