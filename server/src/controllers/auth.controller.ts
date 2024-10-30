import { Request, Response, NextFunction } from "express";
import {
  LoginModel,
  RegisterModel,
  GetUserCredentials,
} from "../models/auth.model";
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

export async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return res.status(400).json({
        success: false,
        message: "Nickname and password are required",
      });
    }

    const userResults = await LoginModel(nickname);

    if (userResults.rows[0].length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid nickname or password",
      });
    }

    const user = userResults.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid nickname or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: { id: user.id, nickname: user.nickname },
      },
    });
  } catch (error) {
    next(error);
  }
}
export async function GetCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nickname, password } = req.body;
    const test = await GetUserCredentials(nickname);
    console.log(test);

    res.json({
      message: test,
    });
  } catch (error) {
    console.log(error);
  }
}
