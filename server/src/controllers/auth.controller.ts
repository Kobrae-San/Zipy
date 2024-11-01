import { Request, Response, NextFunction } from "express";
import { LoginModel, RegisterModel } from "../models/auth.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../configs/jwt.config";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("nickname").trim().escape(),
  body("password").trim().escape(),
];

export const validateLogin = [
  body("nickname")
    .trim()
    .notEmpty()
    .withMessage("Nickname is required")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .escape(),
];

export async function Register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return res.status(400).json({
        success: false,
        message: "Nickname and password are required",
      });
    }

    const userResults = await LoginModel(nickname);

    if (userResults.rows[0]?.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid nickname or password",
      });
    }

    const user = userResults.rows[0];
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid nickname or password",
      });
    }
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

    res.cookie("token", token, {
      secure: true,
      partitioned: true,
      sameSite: "none",
      httpOnly: true,
      maxAge: 60 * 500 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function Logout(req: Request, res: Response, next: NextFunction) {
  res.clearCookie("jwt");
  return res.json({
    success: true,
    message: "Logout successful",
  });
}

export function isLogin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Authenticated",
  });
}
