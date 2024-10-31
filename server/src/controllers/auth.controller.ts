import { Request, Response, NextFunction } from "express";
import { LoginModel, RegisterModel } from "../models/auth.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../configs/jwt.config";
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
      success: true,
      message: "User successfully registered.",
    });
  } catch (error) {
    next(`Error while trying to create user: ${error}`);
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

    const token = jwt.sign(
      { userId: user.id, nickname: user.nickname },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const timer = new Date();
    timer.setMinutes(timer.getMinutes() + 5);

    return res
      .status(200)
      .cookie("jwt", JSON.stringify(token), {
        httpOnly: true,
        expires: timer,
      })
      .json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          nickname: user.nickname,
        },
      })
      .send();
  } catch (error) {
    next(error);
  }
}
