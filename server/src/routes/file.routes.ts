import { Router } from "express";
import {
  getFiles,
  uploadFilesToDb,
  downloadFile,
  deleteFile,
  generateShareLink,
} from "../controllers/file.controller";
import multer from "multer";
import { body, validationResult } from "express-validator";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, PNG, and PDF files are allowed."
        )
      );
    }
  },
}).single("file");

const fileRouter = Router();

fileRouter.get("/history/:userId", getFiles);
fileRouter.post("/upload", upload, uploadFilesToDb);
fileRouter.get("/share/:fileId(\\d+)", generateShareLink);
fileRouter.get("/download/:fileId(\\d+)", downloadFile);
fileRouter.delete("/file/:fileId(\\d+)", deleteFile);

export default fileRouter;
