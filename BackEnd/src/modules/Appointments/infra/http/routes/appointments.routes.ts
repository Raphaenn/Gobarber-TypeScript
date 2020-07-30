import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentsController";
import ProvidersApptController from "../controllers/ProvidersApptController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersApptController = new ProvidersApptController();

// Middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: { provider_id: Joi.string().uuid().required(), date: Joi.date() }
}), appointmentsController.create);

appointmentsRouter.get('/me', providersApptController.index);

export default appointmentsRouter;