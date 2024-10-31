import { Router } from "express";
import { Register, Login, Logout } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout)

export default authRouter;
