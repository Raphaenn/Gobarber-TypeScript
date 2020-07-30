import { Router } from "express";
import multer from "multer";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UsersController from "../controllers/UsersController";
import UpdateAvatarController from "../controllers/UpdateAvatarController";

import uploadConfig from "@config/upload";

const usersRoute = Router();
const usersController = new UsersController();
const updateAvatarController = new UpdateAvatarController();
const upload = multer(uploadConfig);

usersRoute.post("/", celebrate({
    [Segments.BODY]: { 
        name: Joi.string().required(), 
        email: Joi.string().email().required(), 
        password: Joi.string().required(),
    }
}), usersController.create);

// rota para atualizar algumas infos. Só pode alterar se usuário estiver autenticado
usersRoute.patch('/avatar', ensureAuthenticated, upload.single('avatar'), updateAvatarController.create);

export default  usersRoute;