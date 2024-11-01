import { Router } from "express";
import { downloadFile } from "../controllers/file.controller";

const publicFileRouter = Router();

publicFileRouter.get("/download/:fileId(\\d+)", downloadFile);

export default publicFileRouter;
