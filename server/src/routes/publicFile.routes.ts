import { Router } from "express";
import { downloadFileWithToken } from "../controllers/file.controller";

const publicFileRouter = Router();

publicFileRouter.get("/download/:token", downloadFileWithToken);

export default publicFileRouter;
