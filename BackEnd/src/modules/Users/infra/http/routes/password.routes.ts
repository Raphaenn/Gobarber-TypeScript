import { Router } from "express";

import ForgotPassController from "../controllers/ForgotPassController";
import ResetPassController from "../controllers/ResetPassController";

const passwordRouter = Router();
const forgotPassController = new ForgotPassController();
const resetPassController = new ResetPassController();

passwordRouter.post("/forgot", forgotPassController.create);
passwordRouter.post("/reset", resetPassController.create);

export default  passwordRouter;