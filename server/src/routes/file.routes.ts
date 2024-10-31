import { Router } from "express";
import { getFiles } from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.get("/files", getFiles);

export default fileRouter;
