import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import ProfileController from "../controllers/ProfileController";
import UpdateAvatarController from "../controllers/UpdateAvatarController";

import uploadConfig from "@config/upload";

const profileRouter = Router();
const profileController = new ProfileController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

profileRouter.use(ensureAuthenticated);
profileRouter.put("/", profileController.update);
profileRouter.get("/", profileController.index);


export default  profileRouter;