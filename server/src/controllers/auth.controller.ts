import { Request, Response, NextFunction } from "express";
import { RegisterModel } from "../models/auth.model";
import bcrypt from "bcrypt";

export async function Register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nickname, password } = req.body;
    const passwordToRegister = bcrypt.hashSync(password, 10);
    const newUser = await RegisterModel(nickname, passwordToRegister);

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
