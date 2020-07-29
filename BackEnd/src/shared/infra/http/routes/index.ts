import { Router } from "express";
import appointmentsRouter from "@modules/Appointments/infra/http/routes/appointments.routes";
import usersRoute from "@modules/Users/infra/http/routes/users.routes";
import sessionsRoute from "@modules/Users/infra/http/routes/sessions.routes";
import passwordRouter from "@modules/Users/infra/http/routes/password.routes";
import profileRouter from "@modules/Users/infra/http/routes/profile.routes";
import providersRouter from "@modules/Appointments/infra/http/routes/providers.routes";

const routes = Router();

// o use permite enviar o appointmentsRouter para o appointmentsRouters 
routes.use('/sessions', sessionsRoute);
routes.use('/users', usersRoute);
routes.use('/appointmens', appointmentsRouter);
routes.use('/password', passwordRouter); //localhost:3333/password/reset && localhost:3333/password/forgot
routes.use('/profile', profileRouter)
routes.use('/providers', providersRouter)

export default routes;