// arquivo que contem as regras de negocio do agendamento;

import Appointment from "../models/Appointment";
import AppointmentsRepo from "../repositories/AppointmentsRepo";
import { getCustomRepository } from "typeorm";
import { startOfHour } from "date-fns";

interface Request {
    provider: string;
    date: Date;
}

// Dependency Inversion (SOLID)

class CreateappointmentService {

    public async execute({date, provider}: Request): Promise<Appointment> {

        const apptRepo = getCustomRepository(AppointmentsRepo)

        const appDate = startOfHour(date);

        // verifica appoint por appoint e verifica se a data passada é igual a data que ja temos
        const findAppointmentInSameDate = await apptRepo.findByDate(appDate);
    
        // Services nao tem acesso ao response, logo retorna apenas um throw
        if (findAppointmentInSameDate) {
            throw Error("This appointmet is already booked");
        };
    
        // Criar a instancia do modo, logo não salva no banco de dados ainda
        const appointment = apptRepo.create({
            provider,
            date: appDate
        });

        // salvar no banco de dados
        await apptRepo.save(appointment)

        return appointment
    }

};

export default CreateappointmentService;