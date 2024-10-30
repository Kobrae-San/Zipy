import Express, { Request, Response, NextFunction, Router } from "express";
import authRouter from "./auth.routes";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Bienvenue sur Zipy API !",
  });
});

router.use("/auth", authRouter);

export default router;
