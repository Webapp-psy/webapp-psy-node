import { NextFunction, Request, Response, Router } from 'express';
import { AutoEvaluationController } from "../controller/autoEvaluation.controller";
import { checkErrorMiddleware } from "../middleware/errorMiddleware";

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

autoEvaluationRouter.post(
  '/',
  checkErrorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const portfolio = await AutoEvaluationController.create(req.body);
      res.json(portfolio);
    } catch (e) {
      next(e);
    }
  }
);
export default autoEvaluationRouter;
