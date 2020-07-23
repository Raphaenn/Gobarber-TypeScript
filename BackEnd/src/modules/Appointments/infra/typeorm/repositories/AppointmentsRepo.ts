// Arquivo que é responsavel por tudo que vai mexer nos dados de agendamento. Qualquer funcao que for ler, listar, deletar criar... deve ficar dentro do repositorio

import { getRepository, Repository } from "typeorm"

import AppointmentModel from "../entities/Appointment";
import IAppointmentsRepo from "@modules/Appointments/repositories/IAppointmentsRepo";
import ICreateAppointmentDTO from "@modules/Appointments/dtos/ICreateAppointmentDTO";

// implements o escopo de regras do IAppointmentsRepo
class AppointmentsRepo implements IAppointmentsRepo{

    private ormRepository: Repository<AppointmentModel>

    constructor() {
        this.ormRepository = getRepository(AppointmentModel)
    }

    public async findByDate(date: Date): Promise<AppointmentModel | undefined> {

        // metodo do Repository que acha os appointments com data igual a data do parametro
        const findAppointment = await this.ormRepository.findOne({
            where: { date: date },
        });

        return findAppointment || undefined;
    };

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<AppointmentModel> {
        const appointment = this.ormRepository.create({ provider_id, date })

        await this.ormRepository.save(appointment)

        return appointment;
    }
};

export default AppointmentsRepo;







// O extends Repository<AppointmentModel> faz termos acesso a todos metodos do typeorm (create e etc)

// class AppointmentsRepo extends Repository<AppointmentModel> implements IAppointmentsRepo{
//     public async findByDate(date: Date): Promise<AppointmentModel | undefined> {

//         // metodo do Repository que acha os appointments com data igual a data do parametro
//         const findAppointment = await this.findOne({
//             where: { date: date },
//         });

//         return findAppointment || undefined;
//     };
// };