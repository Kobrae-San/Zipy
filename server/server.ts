import Express, { Request, Response, NextFunction } from "express";
import router from "./src/routes/router";
import { envConfig } from "./src/configs/env.config";
import { connectionDatabase, pool } from "./src/configs/database.config";

envConfig();
await connectionDatabase(pool);

const PORT = process.env.SERVER_PORT;
const app = Express();

app.use(Express.json());
app.use("/api", router);

app.listen(PORT, "0.0.0.0", () => { console.log(`Server is running on port ${PORT}`)});
