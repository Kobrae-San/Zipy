import { Router } from "express";
import {
  downloadFileWithToken,
  validateToken,
} from "../controllers/file.controller";

const publicFileRouter = Router();

publicFileRouter.get("/download/:token", validateToken, downloadFileWithToken);

export default publicFileRouter;
