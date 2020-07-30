import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ForgotPassController from "../controllers/ForgotPassController";
import ResetPassController from "../controllers/ResetPassController";

const passwordRouter = Router();
const forgotPassController = new ForgotPassController();
const resetPassController = new ResetPassController();

passwordRouter.post("/forgot", celebrate({
    [Segments.BODY]: { email: Joi.string().email().required()}
}), forgotPassController.create);


// o Celebrate serve como validador de body ou parametros das rotas. Para validar se um Body informado é igual a outro, podemos usar o valid(Joi.ref('password')). 
passwordRouter.post("/reset", celebrate({
    [Segments.BODY]: { token: Joi.string().uuid().required(), 
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
}), resetPassController.create);

export default  passwordRouter;