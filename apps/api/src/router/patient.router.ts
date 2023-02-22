import { NextFunction, Request, Response, Router } from 'express';
import { PatientController } from "../controller/patient.controller";
import { checkErrorMiddleware } from "../middleware/errorMiddleware";
import { param } from "express-validator";
import { patientHandlerMiddleware } from "../middleware/patientHandler.middleware";

const patientRouter = Router();

patientRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    PatientController.getAllPatients()
      .then((patients) => {
        res.json(patients);
      })
      .catch(next);
  }
);

patientRouter.get(
  ('/:id'),
  patientHandlerMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    PatientController.get(res.locals.patientEntity, +req.params.pid)
      .then((patient) => {
        res.json(patient);
      })
      .catch(next);
  }
);

patientRouter.post(
  ('/'),
  checkErrorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patient = await PatientController.create(req.body);
      res.json(patient);
    } catch (e) {
      next(e);
    }
  }
);

patientRouter.put(
  ('/:id'),
  checkErrorMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const admin = await PatientController.put(+req.params.id, req.body);
      res.json(admin);
    } catch (e) {
      next(e);
    }
  }
);

patientRouter.delete(
  ('/:id'),
  param('id').isInt().toInt(),
  checkErrorMiddleware,
  patientHandlerMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patient = await PatientController.logicalDelete(
        res.locals.patientEntity,
        +req.params.id
      );
      res.json(patient);
    } catch (e) {
      next(e);
    }
  }
);

export default patientRouter;
