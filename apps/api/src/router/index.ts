import { Router } from "express";
import pingRouter from "./pingRouter";
import patientRouter from "./patient.router";
import autoEvaluationRouter from "./autoEvaluationTest.router";
import psychologistRouter from "./psychologist.router";
import authRouter from "./auth.router";

const router = Router();

router.use(pingRouter);
router.use('/auth', authRouter);
router.use('/patient', patientRouter);
router.use('/auto-evaluation', autoEvaluationRouter);
router.use('/psychologists', psychologistRouter);

export default router;
