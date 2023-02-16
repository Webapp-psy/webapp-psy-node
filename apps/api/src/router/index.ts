import { Router } from "express";
import pingRouter from "./pingRouter";
import patientRouter from "./patient.router";

const router = Router();

router.use(pingRouter);
router.use('/patient', patientRouter);

export default router;
