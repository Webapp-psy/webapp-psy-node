import { NextFunction, Request, Response, Router } from 'express';
import { PsychologistController } from "../controller/psychologist.controller";
import { checkErrorMiddleware } from "../middleware/errorMiddleware";
import { psychologistHandlerMiddleware } from "../middleware/psychologistHandler.middleware";
import { param } from "express-validator";
import { authenticateJWT } from "../middleware/jwt.middleware";

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
  authenticateJWT,
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

psychologistRouter.put(
  ('/:id'),
  authenticateJWT,
  checkErrorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const psychologist = await PsychologistController.put(+req.params.id, req.body);
      res.json(psychologist);
    } catch (e) {
      next(e);
    }
  }
);

psychologistRouter.delete(
  ('/:id'),
  param('id').isInt().toInt(),
  authenticateJWT,
  checkErrorMiddleware,
  psychologistHandlerMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const psychologist = await PsychologistController.logicalDelete(
        res.locals.psychologistEntity,
        +req.params.id
      );
      res.json(psychologist);
    } catch (e) {
      next(e);
    }
  }
);

export default psychologistRouter;
