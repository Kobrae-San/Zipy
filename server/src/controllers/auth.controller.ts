import { Request, Response, NextFunction } from "express";
import { RegisterModel } from "../models/auth.model";

export async function Register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nickname, password } = req.body;
    const newUser = await RegisterModel(nickname, password);

    res.json({
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
}

export function Login(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({
      message: "Yop le rap!",
    });
  } catch (error) {
    next(error);
  }
}
