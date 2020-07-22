// Arquivo que é responsavel por tudo que vai mexer nos dados de agendamento. Qualquer funcao que for ler, listar, deletar criar... deve ficar dentro do repositorio

import { EntityRepository, Repository } from "typeorm"

import AppointmentModel from "../entities/Appointment";

@EntityRepository(AppointmentModel)
class AppointmentsRepo extends Repository<AppointmentModel> {

    public async findByDate(date: Date): Promise<AppointmentModel | null> {

        // metodo do Repository que acha os appointments com data igual a data do parametro
        const findAppointment = await this.findOne({
            where: { date: date },
        });

        return findAppointment || null;
    };
};

export default AppointmentsRepo;