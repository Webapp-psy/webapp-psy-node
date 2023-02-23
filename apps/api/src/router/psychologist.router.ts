import { NextFunction, Request, Response, Router } from 'express';
import { PsychologistController } from "../controller/psychologist.controller";
import { checkErrorMiddleware } from "../middleware/errorMiddleware";
import { psychologistHandlerMiddleware } from "../middleware/psychologistHandler.middleware";

const psychologistRouter = Router();

psychologistRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    PsychologistController.getAllPsychologists()
      .then((psychologists) => {
        res.json(psychologists);
      })
      .catch(next);
  }
);

psychologistRouter.get(
  ('/:id'),
  psychologistHandlerMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    PsychologistController.get(res.locals.psychologistEntity, +req.params.pid)
      .then((psychologist) => {
        res.json(psychologist);
      })
      .catch(next);
  }
);

psychologistRouter.post(
  ('/'),
  checkErrorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const psychologist = await PsychologistController.create(req.body);
      res.json(psychologist);
    } catch (e) {
      next(e);
    }
  }
);

export default psychologistRouter;
