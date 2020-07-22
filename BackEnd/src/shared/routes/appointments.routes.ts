import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";
import AppointmentsRepo from "../../modules/Appointments/repositories/AppointmentsRepo";
import CreateappointmentService from "../../modules/Appointments/services/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

// Middleware de autenticação
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepo)
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {

        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        //Instanciando tudo
        const createAppt = new CreateappointmentService();

        const appointment = await createAppt.execute({date: parsedDate, provider_id})

        return res.json(appointment);
});

export default appointmentsRouter;