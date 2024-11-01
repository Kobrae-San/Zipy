import { Router } from "express";
import {
  Register,
  Login,
  Logout,
  validateRegister,
  validateLogin,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", validateRegister, Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);

export default authRouter;
