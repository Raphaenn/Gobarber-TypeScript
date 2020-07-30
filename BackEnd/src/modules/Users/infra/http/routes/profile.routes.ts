import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
// import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ProfileController from "../controllers/ProfileController";
// import UpdateAvatarController from "../controllers/UpdateAvatarController";

import uploadConfig from "@config/upload";

const profileRouter = Router();
const profileController = new ProfileController();
// const updateAvatarController = new UpdateAvatarController();
// const upload = multer(uploadConfig);

profileRouter.use(ensureAuthenticated);

profileRouter.put("/", celebrate({
    [Segments.BODY]: { 
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        oldpassword: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
}), profileController.update);

profileRouter.get("/", profileController.index);



export default  profileRouter;