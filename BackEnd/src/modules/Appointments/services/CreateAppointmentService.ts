// arquivo que contem as regras de negocio do agendamento;

import { injectable, inject } from "tsyringe";
import { startOfHour, isBefore, getHours, format } from "date-fns";

import AppointmentModel from "../infra/typeorm/entities/Appointment";
import AppError from "@shared/errors/AppError";
import IAppointmentsRepo from "../repositories/IAppointmentsRepo";
import INotificationsRepository from "@modules/Notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

// Torna a classe injetavel. Toda classe que tiver injeção de dependencias deve ter
@injectable()
class CreateappointmentService {

    // private no parametro, já cria a variavel appointmentsRepository
    constructor(
        @inject("AppointmentsRepo")
        private appointmentsRepository: IAppointmentsRepo,

        @inject("NotificationsRepo")
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
        ) {}

    public async execute({date, provider_id, user_id}: IRequest): Promise<AppointmentModel> {

        const appDate = startOfHour(date);

        // Range hours validation
        if(getHours(appDate) < 8 || getHours(appDate) > 17) {
            throw new AppError("You can only create an apppointments between 8am and 5pm");
        }

        // user / provider validation
        if(user_id === provider_id) {
            throw new AppError("You can not create an apppointment with yourself");
        }

        // Past date validation
        if(isBefore(appDate, Date.now())) {
            throw new AppError("You can not create an apppointment in a past date");
        }

        // verifica appoint por appoint e verifica se a data passada é igual a data que ja temos
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appDate);
    
        // Services nao tem acesso ao response, logo retorna apenas um throw
        if (findAppointmentInSameDate) {
            throw new AppError("This appointmet is already booked");
        };
    
        // Criar a instancia do modo, logo não salva no banco de dados ainda
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appDate
        });

        const dateFormated = format(date, "dd/MM/yyyy 'as' HH:mm'h'");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormated}`
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(appointment.date, 'yyyy-M-d')}`
        )

        return appointment;
    }

};

export default CreateappointmentService;