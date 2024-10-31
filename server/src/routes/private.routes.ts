import { Router } from "express";
import historyRouter from "./history.routes";

const privateRouter = Router();

privateRouter.use(historyRouter);

export default privateRouter;
