import Express, { Request, Response, NextFunction, Router } from "express";
import {
  Register,
  Login,
  GetCredentials,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.get("/register", GetCredentials);

authRouter.post("/login", Login);

export default authRouter;
