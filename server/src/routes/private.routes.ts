import Express, { Router } from "express";
import historyRouter from "./history.routes";

const privateRouter = Router();

privateRouter.use("/private", historyRouter);
