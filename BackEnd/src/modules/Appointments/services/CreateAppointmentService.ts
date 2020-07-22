// arquivo que contem as regras de negocio do agendamento;

import Appointment from "../entities/Appointment";
import AppointmentsRepo from "../repositories/AppointmentsRepo";
import { getCustomRepository } from "typeorm";
import { startOfHour } from "date-fns";

import AppError from "../../../shared/errors/AppError";

interface Request {
    provider_id: string;
    date: Date;
}

class CreateappointmentService {

    public async execute({date, provider_id}: Request): Promise<Appointment> {

        const apptRepo = getCustomRepository(AppointmentsRepo)

        const appDate = startOfHour(date);

        // verifica appoint por appoint e verifica se a data passada é igual a data que ja temos
        const findAppointmentInSameDate = await apptRepo.findByDate(appDate);
    
        // Services nao tem acesso ao response, logo retorna apenas um throw
        if (findAppointmentInSameDate) {
            throw new AppError("This appointmet is already booked", 400);
        };
    
        // Criar a instancia do modo, logo não salva no banco de dados ainda
        const appointment = apptRepo.create({
            provider_id,
            date: appDate
        });

        // salvar no banco de dados
        await apptRepo.save(appointment)

        return appointment
    }

};

export default CreateappointmentService;