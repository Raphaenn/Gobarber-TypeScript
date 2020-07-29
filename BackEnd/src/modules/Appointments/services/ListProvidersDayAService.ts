import { injectable, inject } from "tsyringe";
import { getHours, isAfter } from "date-fns";

import IAppointmentsRepo from "../repositories/IAppointmentsRepo";

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
  }

// Transformar o interface em uma array
type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProvidersDayAService {

    constructor(
        @inject("AppointmentsRepo")
        private appointmentsRepository: IAppointmentsRepo
    ) {};

    public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInDay({
            provider_id,
            day,
            month,
            year
        });

        const hourStart = 8;
        const eachHourArray = Array.from({length: 10}, (value, index) => index + hourStart);

        const currentDate = new Date(Date.now());
        
        const availability = eachHourArray.map(hour => {
            const hasApptHour = appointments.find(appt => getHours(appt.date) === hour);
            const compareDate = new Date(year, month -1, day, hour);

            // retorna caso a data nao esteja ocupada e se a hora nao passou
            return {
                hour,
                available: !hasApptHour && isAfter(compareDate, currentDate)
            }
        });

        return availability
    }

}

export default ListProvidersDayAService;