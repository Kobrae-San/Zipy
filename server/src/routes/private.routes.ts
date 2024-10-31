import { Router } from "express";
import historyRouter from "./file.routes";
import fileRouter from "./file.routes";

const privateRouter = Router();

privateRouter.use(historyRouter);
privateRouter.use(fileRouter);

export default privateRouter;
