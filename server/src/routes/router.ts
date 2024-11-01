import { Request, Response, NextFunction, Router } from "express";
import authRouter from "./auth.routes";
import { verifyToken } from "../middlewares/auth.middleware";
import privateRouter from "./private.routes";
import publicFileRouter from "./publicFile.routes";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Bienvenue sur Zipy API !",
  });
});

router.use("/auth", authRouter);
router.use("/file", publicFileRouter);

router.use(verifyToken);

router.use("/private", privateRouter);

export default router;
