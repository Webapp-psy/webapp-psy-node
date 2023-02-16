import { NextFunction, Request, Response, Router } from 'express';
import { PatientController } from "../controller/patient.controller";

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

export default patientRouter;
