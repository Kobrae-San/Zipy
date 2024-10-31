import { Router } from "express";
import { getFiles, uploadFilesToDb } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.get("/history", getFiles);
fileRouter.post("/upload", uploadFilesToDb);

export default fileRouter;
