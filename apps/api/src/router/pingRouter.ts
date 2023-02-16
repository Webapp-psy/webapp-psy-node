import { Router } from "express";

const pingRouter = Router();

pingRouter.get('/ping', (_req, res) => {
  res.json('pong');
});

export default pingRouter;
