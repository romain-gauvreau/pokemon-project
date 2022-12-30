import express from "express";
import routes from "./routes/v1/index.js";

const app = express();

app.use(express.json());

// v1 api routes
app.use("/v1", routes);

app.get("/", (req, res) => res.send("🏠"));

export default app;
