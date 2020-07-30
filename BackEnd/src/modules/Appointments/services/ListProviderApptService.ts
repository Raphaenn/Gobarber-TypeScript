import { injectable, inject } from "tsyringe";

import AppointmentModel from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepo from "../repositories/IAppointmentsRepo";

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderApptService {
    constructor(
        @inject('AppointmentsRepo')
        private appointmentsRepository: IAppointmentsRepo
    ) {}

    public async execute({ provider_id, day, month, year }: IRequest): Promise<AppointmentModel[]> {
        const appointments = await this.appointmentsRepository.findAllInDay({
            provider_id,
            day,
            month,
            year
        });

        return appointments
    }

}

export default ListProviderApptService