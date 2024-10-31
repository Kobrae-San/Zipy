import Express, { Router } from "express";

const historyRouter = Router();

historyRouter.get("/history", (req, res) => {
    res.send("History");
});

export default historyRouter;
