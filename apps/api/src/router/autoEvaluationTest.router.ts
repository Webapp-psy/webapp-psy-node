import { NextFunction, Request, Response, Router } from 'express';
import { AutoEvaluationController } from "../controller/autoEvaluation.controller";

const autoEvaluationRouter = Router();

autoEvaluationRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    AutoEvaluationController.getAllAutoEvaluations()
      .then((autoEvaluations) => {
        res.json(autoEvaluations);
      })
      .catch(next);
  }
);

export default autoEvaluationRouter;
