import { Router } from "express";

import authRouter from "./authRouter";
import profileRouter from "./profileRouter"
const router = Router();
router.use("/user",authRouter);
router.use("/profile",profileRouter);
export {router};