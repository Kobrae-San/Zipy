import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../configs/jwt.config";
import jwt from "jsonwebtoken";

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.body = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
