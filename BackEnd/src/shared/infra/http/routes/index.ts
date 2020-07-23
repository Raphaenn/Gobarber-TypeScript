import { Router } from "express";
import appointmentsRouter from "@modules/Appointments/infra/http/routes/appointments.routes";
import usersRoute from "@modules/Users/infra/http/routes/users.routes";
import sessionsRoute from "@modules/Users/infra/http/routes/sessions.routes";

const routes = Router();

// o use permite enviar o appointmentsRouter para o appointmentsRouters 

routes.use('/sessions', sessionsRoute);
routes.use('/users', usersRoute);
routes.use('/appointmens', appointmentsRouter);

export default routes;