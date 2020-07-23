import { Router } from "express";

import AppointmentsController from "../controllers/AppointmentsController";
import ensureAuthenticated from "@modules/Users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// Middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async (req, res) => {
//     const appointments = await appointmentsRepository.find();

//     return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;