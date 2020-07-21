import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";
import AppointmentsRepo from "../repositories/AppointmentsRepo";
import CreateappointmentService from "../service/CreateAppointmentService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepo)
    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        //Instanciando tudo
        const createAppt = new CreateappointmentService();

        const appointment = await createAppt.execute({date: parsedDate, provider_id})

        return res.json(appointment);

    } catch (error) {
        return res.status(400).json({messageError: error.message})
    }
});

export default appointmentsRouter;