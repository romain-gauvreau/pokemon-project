# Pokemon project

RESTful API using Node.js, Express and Sequelize (mysql).

## Context

The goal of this project is to allow different trainers to record information about their Pokemon, to be able to consult
them and to trade them.

## Installation

Clone the repository:

```bash
git clone https://github.com/romain-gauvreau/pokemon-project.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables in the following files:

- .env for production
- .env.development for development

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Docker (production):

```bash
docker-compose up -d
```

## Environment variables

The environment variables can be found and modified in the .env* files. They come with these default values:

```bash
NODE_ENV=development
NODE_APP_PORT=8080

# Database
DATABASE_USERNAME=root
DATABASE_PASSWORD=
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=pokemon-project

# JWT
JWT_SECRET=thisisasecret
JWT_ACCESS_TOKEN_EXPIRATION=10
JWT_REFRESH_TOKEN_EXPIRATION=120
```

## Project structure

```
src\
 |--config\         # Project configuration
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Sequelize models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API documentation

The API documentation is available at the following address: http://localhost:8080/v1/api-docs/. This documentation is
generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

A default admin user is created when the application starts. The credentials are:
```json
{
  "username": "leopkmn",
  "password": "cynthia"
}
```

### API roles

Available roles and permissions (specified in the `src/config/roles.js` file):

- **Admin**: can do everything and download the logs
- **Trainer**: can do everything except managing its permissions and other users data


## Error handling

The app has a centralized error handling mechanism.

Controllers catch the errors and forward them to the error handling middleware.

```javascript
const getPokemon = catchAsync(async (req, res) => {
  const pokemon = await pokemonService.getPokemonById(req.params.pokemonId);
  if (!pokemon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Pokemon not found");
  }
  res.send(pokemon);
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Pokemon not found"
}
```

When running in development mode, the error response also contains the error stack.

## Validation

Request data is validated using [Joi](https://joi.dev/). The validation schemas are defined in the `src/validations`
directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const authRouter = Router();

authRouter.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
```

## Authentication
To require authentication we use the `auth` middleware.

```javascript
const pokemonRouter = Router();

pokemonRouter
  .route("/")
  .post(
    auth("managePokemons"),
    validate(pokemonValidation.createPokemon),
    pokemonController.createPokemon
  );
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.
If the user does not have the required permission, a Forbidden (403) error is thrown.

### Auth tokens
An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints.

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

## Logging

HTTP requests are logged using the ```logger``` middleware to track all the backend events.

A log contains the following information:
- Date
- HTTP method
- URL
- Status code
- Response time in milliseconds

```javascript
function logger(req, res, next) {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
  const elapsedHrTime = process.hrtime(startHrTime);
  const responseTime = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
  const { statusCode } = res;
  const { method } = req;
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const route = req.originalUrl;

      console.log(
        `[${date}]: ${method} ${route} ${responseTime}ms (${statusCode})`
      );
      Log.create({ date, route, method, statusCode, responseTime });
  });

  next();
}
```

## Linting

Linting is done using [ESLint](https://eslint.org/).

In our app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).

## Contact

Developed by [Romain Gauvreau](https://fr.linkedin.com/in/romain-gauvreau) during the NodeJS class presented by [Alex Cinq](https://fr.linkedin.com/in/alex-cinq-a454b6139).


