import { Router } from "express";

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
providersRouter.get('/:provider_id/month-availiability', providerMonthController.index);
providersRouter.get('/:provider_id/day-availiability', providerDayController.index);
providersRouter.get('/', providersControllers.index);

export default providersRouter;