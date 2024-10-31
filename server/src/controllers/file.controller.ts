import { Request, Response, NextFunction } from "express";
import { storedFiles, uploadFiles } from "../models/file.model";

export async function getFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id_user } = req.body;
    const response = await storedFiles(id_user);

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

  if (id_user) {
    console.log(id_user);
  } else {
    console.log(false);
  }

  if (id_user && file_name && file_data && file_size && mime_type) {
    try {
      const response = await uploadFiles(
        id_user,
        file_name,
        file_data,
        file_size,
        mime_type
      );

      console.log(response.rows);
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
