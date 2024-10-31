import { Router } from "express";
import { getFiles, uploadFilesToDb } from "../controllers/file.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("/history", getFiles);
fileRouter.post("/upload", upload.single("file"), uploadFilesToDb);

export default fileRouter;
