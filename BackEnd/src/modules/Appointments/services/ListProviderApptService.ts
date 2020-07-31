import { injectable, inject } from "tsyringe";

import AppointmentModel from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepo from "../repositories/IAppointmentsRepo";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

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
        private appointmentsRepository: IAppointmentsRepo,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({ provider_id, day, month, year }: IRequest): Promise<AppointmentModel[]> {
        const cacheKeys = `provider-appointments:${provider_id}:${year}-${month}-${day}`

        let appointments = await this.cacheProvider.recover<AppointmentModel[]>(cacheKeys);

        if(!appointments) {
            const appointments = await this.appointmentsRepository.findAllInDay({
                provider_id,
                day,
                month,
                year
            });
            return appointments
        }

        await this.cacheProvider.save(cacheKeys, appointments)

        return appointments
    }

}

export default ListProviderApptService