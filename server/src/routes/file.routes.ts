import { Router } from "express";
import {
  getFiles,
  uploadFilesToDb,
  downloadFile,
  deleteFile,
  generateShareLink,
} from "../controllers/file.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileRouter = Router();

fileRouter.get("/history/:userId", getFiles);
fileRouter.post("/upload", upload.single("file"), uploadFilesToDb);
fileRouter.get("/share/:fileId(\\d+)", generateShareLink);
fileRouter.get("/download/:fileId(\\d+)", downloadFile);
fileRouter.delete("/file/:fileId(\\d+)", deleteFile);

export default fileRouter;
