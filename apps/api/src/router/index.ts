import { Router } from "express";
import pingRouter from "./pingRouter";
import patientRouter from "./patient.router";
import autoEvaluationRouter from "./autoEvaluationTest.router";

const router = Router();

router.use(pingRouter);
router.use('/patient', patientRouter);
router.use('/auto-evaluation', autoEvaluationRouter);

export default router;
