import express from "express";
import router from "./src/routes/router";
import { envConfig } from "./src/configs/env.config";
import { connectionDatabase, client } from "./src/configs/database.config";
import cors from "cors";
import cookieParser from "cookie-parser";

envConfig();
await connectionDatabase(client);

const PORT: number = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT)
  : 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:4124", "http://127.0.0.1:4124"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
