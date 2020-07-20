import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

// o use permite enviar o appointmentsRouter para o appointmentsRouters 
routes.use('/appointmens', appointmentsRouter);

export default routes;