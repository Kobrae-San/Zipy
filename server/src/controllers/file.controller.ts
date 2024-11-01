import { Request, Response, NextFunction } from "express";
import {
  deleteFileById,
  selectFileById,
  storedFiles,
  uploadFiles,
} from "../models/file.model";

import archiver from "archiver";

export async function getFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const response = await storedFiles(userId);

    console.log(userId);

    if (response.rowCount === 0) {
      return res.status(200).json({
        status: "Failed",
        message: "No file shared history.",
      });
    } else {
      return res.status(200).json({
        status: "Success",
        message: "History Successfully retrieved.",
        content: response.rows,
      });
    }
  } catch (error) {
    next(`Error while trying to retrive file shared history: ${error}`);
  }
}

export async function uploadFilesToDb(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const file = req.file;
  const id_user = req.body.user_id;
  const file_name = file?.originalname;
  const file_data = file?.buffer;
  const file_size = file?.size;
  const mime_type = file?.mimetype;

  if (id_user && file_name && file_data && file_size && mime_type) {
    try {
      const response = await uploadFiles(
        id_user,
        file_name,
        file_data,
        file_size,
        mime_type
      );

      if (response.rows[0].id === 0) {
        return res.status(500).json({
          status: "Failed",
          message: "File not uploaded.",
        });
      } else {
        return res.status(200).json({
          status: "Success",
          message: "File successfully uploaded.",
        });
      }
    } catch (error) {
      next(`Error while trying to upload file: ${error}`);
    }
  }
}

export async function downloadFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const fileId = req.params.fileId;
    const response = await selectFileById(fileId);

    if (response.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "Failed", message: "File not Found" });
    }

    const file = response.rows[0];

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.file_name}.zip`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    archive.on("error", (err) => {
      throw err;
    });

    archive.pipe(res);

    archive.append(file.file_data, { name: file.file_name });

    await archive.finalize();
  } catch (error) {
    next(`Error while trying to download file: ${error}`);
  }
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const fileId = req.params.fileId;
    const response = await deleteFileById(fileId);

    if (response.rowCount === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "File not found",
      });
    } else {
      return res.status(200).json({
        status: "Success",
        message: "File successfully deleted",
      });
    }
  } catch (error) {
    next(`Error while trying to delete file: ${error}`);
  }
}
