import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post(
  '/sign-in',
  async (req: Request, res: Response, next: NextFunction) => {
    AuthController.signIn(req.body)
      .then((data) => {
        res.json({
          accessToken: data.accessToken,
        });
      })
      .catch(next);
  }
);

export default authRouter;
