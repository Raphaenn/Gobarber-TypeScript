import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe"
import CreateappointmentService from "@modules/Appointments/services/CreateAppointmentService";

export default class AppointmentsController {

    public async create( req: Request, res: Response ): Promise<Response> {
        const user_id = req.user.id
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        // container.revolve verifia se o service prcisa de alguma dependencia, vai no container e retorna uma instancia da classe AppointmentsRepo do container
        const createAppt = container.resolve(CreateappointmentService);

        const appointment = await createAppt.execute({date: parsedDate, provider_id, user_id})

        return res.json(appointment);
    }

}