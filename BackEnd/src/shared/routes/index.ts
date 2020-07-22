import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRoute from "./users.routes";
import sessionsRoute from "./sessions.routes";

const routes = Router();

// o use permite enviar o appointmentsRouter para o appointmentsRouters 

routes.use('/sessions', sessionsRoute);
routes.use('/users', usersRoute);
routes.use('/appointmens', appointmentsRouter);

export default routes;