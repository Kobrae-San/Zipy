import Express, { Request, Response, NextFunction } from "express";
import { storedFiles } from "../models/file.model";

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
