import { Router } from "express";

import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";
import ProvidersControllers from "../controllers/ProvidersControllers";

const providersRouter = Router();
const providersControllers = new ProvidersControllers();

// Middleware de autenticação
providersRouter.use(ensureAuthenticated);
providersRouter.get('/', providersControllers.index);

export default providersRouter;