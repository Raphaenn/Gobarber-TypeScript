import { Router } from "express";

import SessionsController from "../controllers/SessionsController";

const sessionsRoute = Router();
const sessionsController = new SessionsController()

sessionsRoute.get("/", sessionsController.create);

export default  sessionsRoute;