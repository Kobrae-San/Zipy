import Express, { Request, Response, NextFunction, Router } from "express";
import { Register, Login } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);

export default authRouter;
