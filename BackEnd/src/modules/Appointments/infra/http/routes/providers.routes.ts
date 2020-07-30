import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";
import ProvidersControllers from "../controllers/ProvidersControllers";
import ProviderMonthController from "../controllers/ProviderMonthController";
import ProviderDayController from "../controllers/ProviderDayController";

const providersRouter = Router();
const providersControllers = new ProvidersControllers();
const providerMonthController = new ProviderMonthController();
const providerDayController = new ProviderDayController();

// Middleware de autenticação
providersRouter.use(ensureAuthenticated);

providersRouter.get('/:provider_id/month-availiability', celebrate({
    [Segments.PARAMS]: { provider_id: Joi.string().uuid().required()}
}), providerMonthController.index);

providersRouter.get('/:provider_id/day-availiability', celebrate({
    [Segments.PARAMS]: { provider_id: Joi.string().uuid().required()}
}), providerDayController.index);

providersRouter.get('/', providersControllers.index);

export default providersRouter;