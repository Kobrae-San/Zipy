import { Router } from "express";

import fileRouter from "./file.routes";

const privateRouter = Router();

privateRouter.use(fileRouter);

export default privateRouter;
